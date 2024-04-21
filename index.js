const express=require('express');
const cors=require('cors')
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const app=express()
const port=process.env.PORT||5000

app.use(cors())
app.use(express.json())
// user detels 
// mizanurrahmanofficial70
// h6IdzL4j5fbVanKb
app.get('/',(req,res)=>{
    res.send("This Is your User Side")
})


const uri = "mongodb+srv://mizanurrahmanofficial70:h6IdzL4j5fbVanKb@cluster1.82n1myq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("UserDB");
    const ALLUsers = database.collection("Users");
    app.get('/users/:id',async(req,res)=>{
      const id=req.params.id
      const quary={_id: new ObjectId(id)}
      const result =await ALLUsers.findOne(quary)
      res.send(result)
    })
    app.get('/users',async(req,res)=>{
      const coursor= ALLUsers.find()
      const result =await coursor.toArray()
      res.send(result)

    })
    app.post('/users', async (req,res)=>{
        const user=req.body
        const result=await ALLUsers.insertOne(user)
        res.send(result)

    })
    app.put('/users/:id',async(req,res)=>{
      const id=req.params.id
      const filter={_id: new ObjectId (id)}
      const users=req.body
      const options={upsert:true}
      const update={
        $set:{
             name:users.name,
             email:users.email
        }
      }
      const result=await ALLUsers.updateMany(filter,update,options)
      res.send(result)
    })
    
    app.delete('/users/:id', async(req,res)=>{
      const id= req.params.id
      console.log('id',id)
      const quary={_id: new ObjectId (id)}
      const result =await  ALLUsers.deleteOne(quary)
      res.send(result)
    })







    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port,()=>{
    console.log(`Your Website is runing${port}`)
})