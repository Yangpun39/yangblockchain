const crypto = require("crypto");
const hextobinary= require("hex-to-binary");
const cryptohash=(...inputs)=>{
    const hash=crypto.createHash("sha256");
    hash.update(inputs.join(""));
    return hash.digest("hex");
};
//result=cryptohash("la");
//console.log(result)
module.exports=cryptohash;