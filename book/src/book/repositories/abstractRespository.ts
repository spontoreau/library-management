import { CosmosClient } from "@azure/cosmos";

export abstract class AbstractRepository {
  protected getEventContainer() {
    const endpoint = process.env.STORE_ENDPOINT ? process.env.STORE_ENDPOINT : "";
    const masterKey = process.env.STORE_KEY ? process.env.STORE_KEY : "";
    const client = new CosmosClient({ endpoint, auth: { masterKey } });
    return client.database("Library").container("Event");
  }
}