import { Injectable } from "@nestjs/common";
import { BookAggregate } from "../aggregates/book.aggregate";
import { AbstractRepository } from "./abstract.respository";
import { SqlQuerySpec } from "@azure/cosmos";

@Injectable()
export class BookRepository extends AbstractRepository {
  async get(aggregateId: string): Promise<BookAggregate>{
    const container = this.getEventContainer();

    const querySpec: SqlQuerySpec = {
      query: `SELECT *
              FROM root
              WHERE root.aggregateId   = @aggregateId    
      `,
      parameters: [{
        name: "@aggregateId",
        value: aggregateId
      }]
    }

    const response = await container.items.query(querySpec, { enableCrossPartitionQuery: true }).toArray();

    if(response.result.length > 0) {
      const book = new BookAggregate(aggregateId);
      book.loadFromHistory(response.result);
      return book;
    } else {
      return undefined;
    }
  }
}