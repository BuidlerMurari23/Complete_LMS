import mongoose from "mongoose"

mongoose.set("strictQuery", false);

const dbConnection = async () => {
    try {
        const { connection } = await mongoose.connect(
            process.env.MONGODB_URL || `mongodb://127.0.0.1:27017/lms`
        );

        if(connection){
            console.log(`Server is connected to mongoDB: ${connection.host}`)
        }
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

export default dbConnection;