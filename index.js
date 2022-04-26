const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();
require('dotenv').config()

//middleware-------------->
app.use(cors());
app.use(express.json());

//username : milon570
// pass : hahJi2P8Tbz7L2v4



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6lcky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const resortCollection = client.db('Resorts').collection('Services');
        const orderCollection = client.db('Resorts').collection('order');

        app.get('/service', async(req, res) => {
            const query = {};
            const cursor = resortCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get('/service/:id', async(req, res) =>{
            const id = req.params.id;
            const query= {_id: ObjectId(id)}
            const detailOne = await resortCollection.findOne(query);
            res.send(detailOne);
        });

        //post------------>
        app.post('/service', async(req, res)=>{
            const newUser = req.body;
            const result = await resortCollection.insertOne(newUser);
            res.send(result);
        });
        //Delete---------->
        app.delete('/service/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = await resortCollection.deleteOne(query);
            res.send(result);
        });

        //order collection Api-------->
        app.post('/order', async(req, res)=>{
            const newOrder = req.body;
            const result = await orderCollection.insertOne(newOrder);
            res.send(result);
        })

    

    }
    finally {

    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Running my Resort Server')
});
app.listen(port, () => {
    console.log('my port is', port)
})