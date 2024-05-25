const crypto =require("crypto");

const generateResetToken=()=>{
   const token= crypto.randomBytes(32).toString('hex');
    return token;
}
const generateExpiryTime =()=>{
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 1); 
    // Sets expiry time to 1 hour from the current time
    return expiry;
}

module.exports ={generateResetToken,generateExpiryTime}
