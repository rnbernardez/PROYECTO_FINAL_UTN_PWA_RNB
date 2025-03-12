import mongoose from "mongoose";
import ENVIROMENT from "./enviromentconfig.js";

const connectToMongoDB = async () =>{
    try{
        const response = await mongoose.connect(ENVIROMENT.MONGO_DB_URL)
        console.log('Conexion exitosa con MongoDB', mongoose.connection.name)
    }
    catch(error){
        console.log('Ocurrio un error al conectarse con MongoDB', error)
    }
} 

export default connectToMongoDB