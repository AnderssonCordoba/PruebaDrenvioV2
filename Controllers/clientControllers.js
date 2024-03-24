import Client from '../Models/clientSChema.js';
import Brand from '../Models/brandSchema.js';
import mongoose from 'mongoose'; 


// Controlador para agregar un nuevo cliente
export const addClient = async (req, res) => {
  try {
    const { nombre, identificacion, telefono, email, specialBrands } = req.body;

    // Verificar si todos los campos requeridos están presentes
    if (!nombre || !telefono || !email || !identificacion) {
      return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }


    const client = new Client({ nombre, identificacion, telefono, email, specialBrands });
    await client.save();
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controlador para obtener todos los clientes
export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();

    if (clients.length === 0) {
      return res.status(404).json({ message: 'No hay clientes registrados.' });
    }

    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener un cliente por su Iidentificación
export const getClientByID = async (req, res) => {
    try { 
      const { identificacion } = req.params; // Obtener la identificación del cliente de los parámetros de la URL
      const client = await Client.findOne({ identificacion }); // Buscar cliente por identificación
  
      if (!client) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
  
      res.json(client);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Controlador para actualizar un cliente por su identificación
export const updateClient = async (req, res) => {
    try { 
      const { nombre, telefono, email, specialBrands } = req.body;
      const { identificacion } = req.params; // Obtener la identificación del cliente de los parámetros de la URL
  
      // Verificar si los campos requeridos están presentes
      if (!nombre || !telefono || !email) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
      }
  
        
      // Actualizar el cliente por identificación
      const updatedClient = await Client.findOneAndUpdate(
        { identificacion }, // Buscar cliente por identificación
        { nombre, telefono, email, specialBrands },
        { new: true }
      );
  
      // Verificar si el cliente fue encontrado y actualizado correctamente
      if (!updatedClient) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
  
      // Enviar el cliente actualizado como respuesta
      res.json(updatedClient);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  

// Controlador para eliminar un cliente por su Identificacion
export const deleteClient = async (req, res) => {
    try {
      const { identificacion } = req.params;
  
      const client = await Client.findOneAndDelete({ identificacion });
  
      if (!client) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
  
      res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  
// Controlador para agregar una Brand a un Cliente
export const addBrandToClient = async (req, res) => {
    try {
      const { identificacion } = req.params;
      const { brandId } = req.body;
  
      // Verificar si el cliente existe
      const client = await Client.findOne({ identificacion });
      if (!client) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
  
      // Verificar si la brandId es válida
      if (!mongoose.Types.ObjectId.isValid(brandId)) {
        return res.status(400).json({ message: 'ID de marca no válido' });
      }
  
      // Verificar si la brand existe
      const brand = await Brand.findById(brandId);
      if (!brand) {
        return res.status(404).json({ message: 'Marca no encontrada' });
      }
  
      // Agregar la brand al cliente si aún no está asociada
      if (!client.specialBrands.includes(brandId)) {
        client.specialBrands.push(brandId);
        await client.save();
      }
  
      res.json({ message: 'Marca agregada al cliente correctamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };