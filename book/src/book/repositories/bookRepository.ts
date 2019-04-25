import { Injectable } from "@nestjs/common";
import { Book } from "../aggregates/book";
import { AbstractRepository } from "./abstractRespository";
import { SqlQuerySpec } from "@azure/cosmos";

@Injectable()
export class BookRepository extends AbstractRepository {
  async get(aggregateId: string): Promise<Book>{
    const container = this.getEventContainer();

    const querySpec: SqlQuerySpec = {
      query: `SELECT root.aggregateId root.eventName root.data
              FROM root
              WHERE root.aggregateId   = @aggregateId    
      `,
      parameters: [{
        name: "@aggregateId",
        value: aggregateId
      }]
    }

    const response = await container.items.query(querySpec).toArray();

    if(response.result.length > 0) {
      const book = new Book(aggregateId);
      book.loadFromHistory(response.result);
      return book;
    } else {
      return undefined;
    }
  }
}