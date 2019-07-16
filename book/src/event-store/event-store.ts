import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";
import { EventDescriptor } from "./event-descriptor";
import { Injectable } from "@nestjs/common";
import { AggregateRoot } from "@nestjs/cqrs";

@Injectable()
export class EventStore {
  private getContainer() {
    const endpoint = process.env.EVENT_STORE_ENDPOINT;
    const masterKey = process.env.EVENT_STORE_KEY;
    const client = new CosmosClient({ endpoint, auth: { masterKey } });
    return client.database("EventStore").container("Events");
  }

  async create(eventDescriptor: EventDescriptor): Promise<void>{
    const container = this.getContainer();
    await container.items.create(eventDescriptor);    
  }

  async get<T extends AggregateRoot>(
    aggregateId: string, 
    aggregateCtor: new (aggregateId: string) => T
  ): Promise<T>{
    const container = this.getContainer();

    const querySpec: SqlQuerySpec = {
      query: `SELECT 
                root.eventType, 
                root.payload 
              FROM root
              WHERE root.aggregateId   = @aggregateId    
      `,
      parameters: [{
        name: "@aggregateId",
        value: aggregateId
      }]
    }

    const response = await container.items.query(querySpec, { enableCrossPartitionQuery: true }).toArray();

    if(response.result && response.result.length > 0) {
      const aggregate = new aggregateCtor(aggregateId);
      aggregate.loadFromHistory(response.result);
      return aggregate;
    }

    return undefined;

  }
}