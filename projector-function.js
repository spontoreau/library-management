const cosmos = require('@azure/cosmos');

const createBookProjections = async (context, documents) => {
    if (!!documents && documents.length > 0) {
        documents.forEach(async (doc) => {
            const book = JSON.parse(doc.data);
            book.lent = false;

            const endpoint = process.env.BOOK_ENDPOINT ? process.env.BOOK_ENDPOINT : "";
            const masterKey = process.env.BOOK_KEY ? process.env.BOOK_KEY : "";
            const client = new cosmos.CosmosClient({ endpoint, auth: { masterKey } });
            await client.database("Library").container("Book").items.create(book);
        });
    }

    context.done();
}

/*    {
    "name": "docOut",
    "type": "documentDB",
    "databaseName": "Library",
    "collectionName": "Book",
    "createIfNotExists": false,
    "partitionKey": "code",
    "connection": "library-management_DOCUMENTDB",
    "direction": "out"
}*/

module.exports = createBookProjections;
