import { Injectable } from "@nestjs/common";
import { CosmosClient } from "@azure/cosmos";
import { BookProjection } from "../queries/book.readmodel";

@Injectable()
export class BookFinder {
  private getBookContainer() {
    const endpoint = process.env.READ_ENDPOINT ? process.env.READ_ENDPOINT : "";
    const masterKey = process.env.READ_KEY ? process.env.READ_KEY : "";
    const client = new CosmosClient({ endpoint, auth: { masterKey } });

    return client.database("Library").container("Book");
  }

  async getAll() {
    const container = this.getBookContainer();
    const { result: items } = await container.items.readAll().toArray();
    return items.map<BookProjection>((value) => {
      return {
        code: value.code,
        title: value.title,
        author: value.author,
        lent: value.lent
      };
    });;
  }
}
