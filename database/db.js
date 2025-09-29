import mongoose from "mongoose"

const dbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("DB connection is successful");
    })
    .catch((error)=>{
        console.log("Database is not connected");
        console.log(error.message)
        process.exit(1);
    })
}

export default dbConnect;