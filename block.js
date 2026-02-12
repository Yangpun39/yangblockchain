// const {genisis_data, MINE_RATE}=require("./config");//onject 
// const hextobinary=require("hex-to-binary");
// const cryptohash=require("./crypto_hash");//function
// class block{
//     constructor({ timestamp,prevhash,hash,data ,nonce,difficulty})//passing as a form of object
//     {
//         this.timestamp=timestamp;
//         this.prevhash=prevhash;
//         this.hash=hash;
//         this.data=data;
//     this.nonce=nonce;
//     this.difficulty=difficulty;
//     }
//     static genesis()
//     {
//         return new this(genisis_data);
//     } 

//     static mineblock({ prevblock, data }) {
//         let hash, timestamp;
//         const prevhash = prevblock.hash;
//         let { difficulty } = prevblock;
//         let nonce = 0;
    
//         const startTime = Date.now();
//         console.log(`Starting mining with difficulty ${difficulty}...`);
    
//         do {
//             nonce++;
//             timestamp = Date.now();
//             difficulty= difficulty=block.adjust_difficulty({
//                 originalBlock:prevblock,
//                 timestamp
//             });
//             // hash = require("./crypto_hash")(timestamp, prevhash, data, nonce, difficulty);
//             hash = cryptohash(timestamp, prevhash, data, nonce, difficulty);
//             hash = cryptohash(hash);
    
//             // Log progress every 100,000 iterations
//             if (nonce % 100000 === 0) {
//                 console.log(`Still mining... Current nonce: ${nonce}`);
//             }
//         } while(hextobinary(hash).substring(0,difficulty)!=="0".repeat(difficulty));//first 2 digit of hash is 0 eg-00abc then go out of loop
    
//         const endTime = Date.now();
//         const timeTaken = endTime - startTime;
    
//         console.log(`Block mined! Nonce: ${nonce}, Time Taken: ${timeTaken}ms, Hash: ${hash}`);
    
//         return new this({
//             timestamp,
//             prevhash,
//             data,
//             difficulty,
//             nonce,
//             hash
//         });
//     }
//     // static mineblock({ prevblock, data }) {
//     //     let hash, timestamp;
//     //     const prevhash = prevblock.hash;
//     //     let { difficulty } = prevblock;
//     //     let nonce = 0;
    
//     //     const startTime = Date.now();
//     //     console.log(`Mining a new block with difficulty ${difficulty}...`);
    
//     //     do {
//     //         nonce++;
//     //         timestamp = Date.now();
//     //         difficulty = block.adjust_difficulty({ originalBlock: prevblock, timestamp });
//     //         hash = require("./crypto_hash")(timestamp, prevhash, data, nonce, difficulty);
//     //     } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));
    
//     //     const endTime = Date.now();
//     //     const timeTaken = endTime - startTime;
    
//     //     console.log(`Block mined! Nonce: ${nonce}, Time Taken: ${timeTaken}ms, Hash: ${hash}`);
    
//     //     return new this({
//     //         timestamp,
//     //         prevhash,
//     //         hash,
//     //         data,
//     //         difficulty,
//     //         nonce,
//     //     });
//     // }

//     static adjust_difficulty({ originalBlock, timestamp }) {
//         const { difficulty } = originalBlock;
    
//         if (timestamp - originalBlock.timestamp > MINE_RATE) {
//             return difficulty; // Prevent lowering difficulty
//         } else {
//             return difficulty + 1; // Increase difficulty if mining is too fast
//         }
//     }
//     //second
//     // static adjust_difficulty({ originalBlock, timestamp }) {
//     //     const { difficulty } = originalBlock;
//     //     const { MINE_RATE } = require("./config");
    
//     //     if (difficulty < 3) return 3; 
    
//     //     if (timestamp - originalBlock.timestamp > MINE_RATE) {
//     //         return difficulty - 1;
//     //     } else {
//     //         return difficulty + 1; 
//     //     }
//     // }
// }
// // const block1=new block({
// //     timestamp:'12312431241',
// //     prevhash:'ox123',
// //     hash:'0xcb',
// //     data:'hello'});//calling by object can pass in any order   
// // const block2=new block('3/09/22','0xc12','oxca','world');
// //console.log(block1)
// // console.log(block2)
//  const genesisblock=block.genesis();
// console.log(genesisblock);
// //const result=block.mineblock({prevblock:block1,data:"block2"});
// //console.log(result)
// module.exports=block;
const {genisis_data, MINE_RATE}=require("./config");//onject 
const hextobinary=require("hex-to-binary");
const cryptohash=require("./crypto_hash");//function
class block{
    constructor({ timestamp,prevhash,hash,data ,nonce,difficulty})//passing as a form of object
    {
        this.timestamp=timestamp;
        this.prevhash=prevhash;
        this.hash=hash;
        this.data=data;
    this.nonce=nonce;
    this.difficulty=difficulty;
    }
    static genesis()
    {
        return new this(genisis_data);
    } 
    static mineblock({prevblock,data})
    {
        let hash,timestamp;
        const prevhash=prevblock.hash;
        //const {difficulty}=prevblock;
        let {difficulty}=prevblock;
        let nonce=0
                const startTime = Date.now();
        console.log(`Mining a new block with difficulty ${difficulty}...`);
    
        do {
                        nonce++;
                        timestamp = Date.now();
                        difficulty = block.adjust_difficulty({ originalBlock: prevblock, timestamp });
                        hash = require("./crypto_hash")(timestamp, prevhash, data, nonce, difficulty);
                        if (nonce % 100000 === 0) {
                            console.log(`Still mining... Current nonce: ${nonce}`);
                        }
                    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));
                
                    const endTime = Date.now();
                    const timeTaken = endTime - startTime;
                
                    console.log(`Block mined! Nonce: ${nonce}, Time Taken: ${timeTaken}ms, Hash: ${hash}`);
                
        return new this({
            timestamp,
            prevhash,
            data,
            difficulty,
            nonce,
            hash,
            timeTaken
        });
    }
    static adjust_difficulty({ originalBlock, timestamp }) {
        const { difficulty } = originalBlock;
        const { MINE_RATE } = require("./config");
    
        if (timestamp - originalBlock.timestamp > MINE_RATE) {
            return difficulty; // Prevent lowering difficulty
        } else {
            return difficulty + 1; // Increase difficulty if mining is too fast
        }
    }
}
// const block1=new block({
//     timestamp:'12312431241',
//     prevhash:'ox123',
//     hash:'0xcb',
//     data:'hello'});//calling by object can pass in any order   
// const block2=new block('3/09/22','0xc12','oxca','world');
//console.log(block1)
// console.log(block2)
 const genesisblock=block.genesis();
console.log(genesisblock);
//const result=block.mineblock({prevblock:block1,data:"block2"});
//console.log(result)
module.exports=block;