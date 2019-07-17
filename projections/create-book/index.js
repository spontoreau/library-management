const cosmos = require('@azure/cosmos');

const createBookProjections = async (context, documents) => {
    if (!!documents && documents.length > 0) {
        const endpoint = process.env.LIBRARY_ENDPOINT;
        const masterKey = process.env.LIBRARY_KEY;
        const client = new cosmos.CosmosClient({ endpoint, auth: { masterKey } });
        const container = client.database("Library").container("Book");

        documents.forEach(async (doc) => {
            const { author, title} = doc.payload;
            const book = {
                code: doc.aggregateId,
                author,
                title
            }
            
            await container.items.create(book);
        });
    }

    context.done();
}

module.exports = createBookProjections;