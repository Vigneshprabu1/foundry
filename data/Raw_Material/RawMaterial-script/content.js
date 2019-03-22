 const MongoClient = require('mongodb').MongoClient;
 async function beforeRender(req, res) {
     const conn = await MongoClient.connect('mongodb://localhost:27017');
    // const query = { name: "sss" };
     Object.assign(req.data,{
        items: await  conn.db('foundry').collection('rawmaterialconsumptionreports').find().toArray()
     });
 }