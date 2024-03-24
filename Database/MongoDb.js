import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('Conexión a la base de datos exitosa!!');
} catch (error) {
    console.error('Error al conectar a la base de datos: ' + error);
}
