import { Injectable } from "@nestjs/common";
import { CosmosClient } from "@azure/cosmos";

@Injectable()
export class EventRepository {
  private getEventContainer() {
    const endpoint = process.env.STORE_ENDPOINT ? process.env.STORE_ENDPOINT : "";
    const masterKey = process.env.STORE_KEY ? process.env.STORE_KEY : "";
    const client = new CosmosClient({ endpoint, auth: { masterKey } });
    return client.database("Library").container("Event");
  }

  async save(eventDescriptor: { aggregateId: string, eventName: string, data: string }): Promise<void>{
    const container = this.getEventContainer();
    await container.items.create(eventDescriptor);
  }
}