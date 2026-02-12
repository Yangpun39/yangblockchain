const express=require("express");
const request=require("request");
const bodyparser=require("body-parser");
const Blockchain=require("./blockchain");
const  PubSub=require("./publishsubscribe")
//const blockchain = require("./blockchain");
const app=express()
const blockchain=new Blockchain();
const pubsub= new PubSub({blockchain});

const DEFAULT_PORT=3000;
const ROOT_NODE_ADDRESS=`http://localhost:${DEFAULT_PORT}`;
setTimeout(()=>pubsub.broadcastChain(),1000);

app.use(bodyparser.json());
app.get("/api/block",(req,res)=>{
    res.json(blockchain.chain);//want to show the data of this file but needs to be converted in json format as js object cannot be shown in the net
});

app.post("/api/mine", (req, res) => {
    const { data } = req.body;
    blockchain.addblock({ data });
    pubsub.broadcastChain(); // Broadcast the updated blockchain
    res.redirect("/api/block");
});
const synChain=()=>{
    request( 
        {url:`${ROOT_NODE_ADDRESS}/api/block`},
         (error,response,body)=>{
        if(!error && response.statusCode===200){
            const rootChain=JSON.parse(body);
            console.log("Replace chain on syn with",rootChain)
            blockchain.replaceChain(rootChain)
        }
    }
    );
};
let PEER_PORT;
if(process.env.GENERATE_PEER_PORT==='true'){
    PEER_PORT=DEFAULT_PORT+Math.ceil(Math.random()*1000);
}
const PORT=PEER_PORT || DEFAULT_PORT;
app.listen(PORT,()=>{
    console.log(`listening to PORT:${PORT}`);
    synChain();
});
//if a peer want ot send a data then just paste the peer port no in the post man instead of 3000 