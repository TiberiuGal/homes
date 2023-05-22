'use strict'

const { MongoClient } = require('mongodb');
var url = "mongodb://localhost:27017/wiki";


module.exports = {
    async getPage(id) { 
        const client = new MongoClient(url);
        try {
            await client.connect();
            return await client.db().collection('pages').findOne({_id: Number(id)})
        } catch (err) {
            console.log(err.stack);
        } finally {
            await client.close();
        }
    },
    async savePage(page) {
        const client = new MongoClient(url);
        try {
            await client.connect();
            return await client.db().collection('pages').insertOne(page);
        } catch (err) {
            console.log(err.stack);
        } finally {
            await client.close();
        }
    }
}