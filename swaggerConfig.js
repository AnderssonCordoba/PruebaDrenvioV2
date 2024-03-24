import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',  
    info: {
      title: 'API de Sneakers',  
      version: '1.0.0',  
      description: 'Documentación de la API de Sneakers',  
    },
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

