import "dotenv/config";
import './Database/MongoDb.js';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig.js';  
import fileUpload from 'express-fileupload'

import productRoutes from './Routes/productRoutes.js'
import brandRoutes from './Routes/brandRoutes.js'
import clientRoutes from './Routes/clientRoutes.js' 
import salesRoutes from './Routes/salesRoutes.js' 
import priceRoutes from './Routes/priceRoutes.js' 

const app = express();

app.use(express.json());

// Middlewares
app.use(express.json());
    //carga de archivos
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './files'
}));
app.use(morgan('dev'));
  
// Ruta para servir la documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/products', productRoutes);  
app.use('/brands', brandRoutes);  
app.use('/clients', clientRoutes);  
app.use('/sale', salesRoutes);  
app.use('/price', priceRoutes);  

// Configuración de CORS para permitir acceso desde tu frontend de React
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
app.use(cors(corsOptions));

// Declarar los puertos
const PORT = process.env.PORT || 3001;
 
app.listen(PORT, ()=> { 
        console.log(`Servidor Express escuchando en el puerto ${PORT}`);
        console.log("ruta: http://localhost:"+ PORT)
    }
)