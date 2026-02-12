const block=require("./block");
const cryptohash = require("./crypto_hash");
class blockchain
{
    constructor(){
        this.chain=[block.genesis()];
    }
    addblock({data}){
        const newblock=block.mineblock({
            prevblock:this.chain[this.chain.length-1],
            data,
        });
        this.chain.push(newblock);
    }
    replaceChain(chain)
    {
        if(chain.length<=this.chain.length)
        {
            console.error("the incoming chain is not longer")
        return
        }
        if(!blockchain.isValidChain(chain))
        {
            console.error('the incoming chain is not valid')
            return;
        }
        this.chain=chain;
    }
    static isValidChain(chain){
        if(JSON.stringify(chain[0])!==JSON.stringify(block.genesis())){
            //console.log("chup");
            return false;
        
        }
        for (let i = 1; i < chain.length; i++) {
            const {timestamp,prevhash,hash,nonce,difficulty,data} = chain[i];//get all this values from chain[i]
            const lastdifficulty=chain[i-1].difficulty;
            const reallasthash=chain[i-1].hash;

            if(prevhash!==reallasthash){return false};
           
            const validatedhash=cryptohash(
                timestamp,
                prevhash,
                data,
                nonce,
                difficulty
                );
            if(hash!==validatedhash){return false;};
            if(Math.abs(lastdifficulty-difficulty)>1)return false;
        }
        return true;
        
    }

}
const Blockchain=new blockchain();
// Blockchain.addblock({data:"block1"});
// Blockchain.addblock({data:"block2"});
// const result=blockchain.isValidChain(Blockchain.chain);
// console.log(Blockchain)
// console.log(result);

module.exports=blockchain