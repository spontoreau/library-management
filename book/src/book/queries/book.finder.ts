import { Injectable } from "@nestjs/common";
import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";
import { BookReadModel } from "./book.readmodel";

@Injectable()
export class BookFinder {
  private getContainer() {
    const endpoint = process.env.READ_ENDPOINT;
    const masterKey = process.env.READ_KEY;
    const client = new CosmosClient({ endpoint, auth: { masterKey } });

    return client.database("Library").container("Book");
  }

  async getAll() {
    const container = this.getContainer();

    const querySpec: SqlQuerySpec = {
      query: `SELECT 
                root.code, 
                root.title,
                root.author 
              FROM root  
      `
    };

    const { result } = await container.items.query<BookReadModel>(querySpec, { enableCrossPartitionQuery: true }).toArray();
    return result;
  }
}
