const generateOtp = async () => {
    
    return Math.floor(1000 + Math.random() * 9000);
};

module.exports={generateOtp}
