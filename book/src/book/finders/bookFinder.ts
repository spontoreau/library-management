import { Injectable } from "@nestjs/common";
import { CosmosClient } from "@azure/cosmos";
import { BookModel } from "../models/bookModel";

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
    const response = await container.items.readAll<BookModel>().toArray();
    return response.result;
  }
}
