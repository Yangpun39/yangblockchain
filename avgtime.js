const Blockchain=require("./blockchain");
const blockchain= new Blockchain();
blockchain.addblock({data:'newblock'});
let pretimestamp,nexttimestamp,newblock,timediff,averagetime;
const times=[];
// console.log(blockchain.chain[blockchain.chain.length-1]);
for (let i = 0; i < 1000; i++) {
    pretimestamp=blockchain.chain[blockchain.chain.length-1].timestamp;
    blockchain.addblock({data:`block ${i}`});
    nextblock=blockchain.chain[blockchain.chain.length-1];
    nexttimestamp=nextblock.timestamp;
    timediff=nexttimestamp-pretimestamp;
    times.push(timediff); 
    averagetime=times.reduce((total,num)=> total+num)/times.length;
    //console.log(averagetime);
    console.log(`time to mine block : ${timediff} ms,
         Difficulty:${nextblock.difficulty},
          Average time:${averagetime} ms`); 
}