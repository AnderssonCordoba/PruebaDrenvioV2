import Brand from '../Models/brandSchema.js';  
import Product from '../Models/productSchema.js';
import mongoose from 'mongoose';

// Controlador para agregar una nueva marca 
export const addBrand = async (req, res) => {
    try {
      // Validar si el campo 'nombre' está presente en el cuerpo de la solicitud
      if (!req.body.nombre) {
        return res.status(400).json({ message: "El campo 'nombre' es requerido." });
      }
  
      const { nombre } = req.body;
  
      // Verificar si la longitud del nombre es válida
      const minLength = 2; 
      const maxLength = 50;
      if (nombre.length < minLength || nombre.length > maxLength) {
        return res.status(400).json({ message: `La longitud del nombre debe estar entre ${minLength} y ${maxLength} caracteres.` });
      }
  
      // Comprobar si la marca ya existe en la base de datos
      const existingBrand = await Brand.findOne({ nombre });
      if (existingBrand) {
        return res.status(400).json({ message: 'La marca ya existe.' });
      }
  
      // Crear una nueva instancia de la marca y guardarla en la base de datos
      const brand = new Brand({ nombre });
      await brand.save();
      
      // Enviar la marca creada como respuesta
      res.status(201).json(brand);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

// Controlador para obtener todas las marcas
export const getAllBrands = async (req, res) => {
    try {
      // Obtener todas las marcas de la base de datos
      const brands = await Brand.find();
  
      // Verificar si hay marcas registradas
      if (brands.length === 0) {
        return res.status(404).json({ message: 'No hay marcas registradas.' });
      }
  
      // Paginación de resultados
      const limit = parseInt(req.query.limit) || 10; // Número de marcas por página
      const page = parseInt(req.query.page) || 1; // Número de página
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedBrands = brands.slice(startIndex, endIndex);
  
      // Construir objeto de respuesta con información de paginación
      const response = {
        brands: paginatedBrands,
        pageInfo: {
          currentPage: page,
          totalPages: Math.ceil(brands.length / limit),
          totalBrands: brands.length
        }
      };
  
      // Devolver la respuesta
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};  

// Controlador para obtener una marca por su ID
export const getBrandByID = async (req, res) => {
    try {
      // Validar si el parámetro ID es un ObjectId válido
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'ID de marca no válido' });
      }
  
      // Buscar la marca por su ID en la base de datos
      const brand = await Brand.findById(req.params.id);
  
      // Verificar si se encontró la marca
      if (!brand) {
        return res.status(404).json({ message: 'Marca no encontrada' });
      }
  
      // Si se encuentra la marca, enviarla como respuesta
      res.json(brand);
    } catch (error) {
      // Manejar errores generales
      res.status(500).json({ message: error.message });
    }
};
  

// Controlador para actualizar una marca por su ID
export const updateBrand = async (req, res) => {
    try {
      // Validar si el parámetro ID es un ObjectId válido
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'ID de marca no válido' });
      }
  
      // Verificar si el cuerpo de la solicitud contiene el campo 'nombre'
      if (!req.body.nombre) {
        return res.status(400).json({ message: 'El campo "nombre" es requerido para actualizar la marca' });
      }
  
      // Buscar y actualizar la marca por su ID en la base de datos
      const brand = await Brand.findByIdAndUpdate(req.params.id, { nombre: req.body.nombre }, { new: true });
  
      // Verificar si se encontró la marca
      if (!brand) {
        return res.status(404).json({ message: 'Marca no encontrada' });
      }
  
      // Si se actualiza correctamente, enviar la marca actualizada como respuesta
      res.json(brand);
    } catch (error) {
      // Manejar errores generales
      res.status(400).json({ message: error.message });
    }
};
   
// Controlador para eliminar una marca por su ID
export const deleteBrand = async (req, res) => {
    try {
      // Validar si el parámetro ID es un ObjectId válido
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'ID de marca no válido' });
      }
  
      // Buscar y eliminar la marca por su ID en la base de datos
      const brand = await Brand.findByIdAndDelete(req.params.id);
  
      // Verificar si se encontró la marca
      if (!brand) {
        return res.status(404).json({ message: 'Marca no encontrada' });
      }
  
      // Si se elimina correctamente, enviar un mensaje de éxito como respuesta
      res.json({ message: 'Marca eliminada correctamente' });
    } catch (error) {
      // Manejar errores generales
      res.status(500).json({ message: error.message });
    }
  };
  
// Controlador para obtener todos los productos asociados a una marca por su ID
export const getProductsByBrand = async (req, res) => {
    try {
      // Verificar si el parámetro ID de la marca es un ObjectId válido
      if (!mongoose.Types.ObjectId.isValid(req.params.brandId)) {
        return res.status(400).json({ message: 'ID de marca no válido' });
      }
  
      // Buscar todos los productos que tengan la marca especificada
      const products = await Product.find({ Brand: req.params.brandId });
  
      // Verificar si se encontraron productos asociados a la marca
      if (products.length === 0) {
        return res.status(404).json({ message: 'No se encontraron productos asociados a la marca especificada' });
      }
  
      // Si se encuentran productos, enviarlos como respuesta
      res.json(products);
    } catch (error) {
      // Manejar errores generales
      res.status(500).json({ message: error.message });
    }
};