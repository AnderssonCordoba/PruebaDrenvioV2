import Product from '../Models/productSchema.js';
import mongoose from 'mongoose';


// Controlador para agregar un nuevo producto
export const addProduct = async (req, res) => {
  try {
    const requiredFields = ['nombre', 'Brand', 'Stock', 'price'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `El campo '${field}' es requerido.` });
      }
    }

    const { Stock, price } = req.body;
    if (typeof Stock !== 'number' || Stock < 0 ||
        typeof price !== 'number' || price < 0 ) {
      return res.status(400).json({ message: 'Los campos numéricos deben ser números válidos y no negativos.' });
    }

    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controlador para obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    // Configurar la paginación
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * limit;

    // Obtener los productos con stock disponible y populando la referencia a la marca
    const products = await Product.find({ Stock: { $gt: 0 } })
                                   .limit(limit)
                                   .skip(startIndex)
                                   .populate('Brand');

    if (products.length === 0) {
      return res.status(404).json({ message: 'No hay productos disponibles en stock.' });
    }

    // Obtener la cantidad total de productos con stock disponible
    const totalProducts = await Product.countDocuments({ Stock: { $gt: 0 } });

    // Verificar si hay más páginas disponibles
    const hasNextPage = (startIndex + limit) < totalProducts;

    // Crear el objeto de respuesta con los productos y la información de paginación
    const response = {
      products,
      pageInfo: {
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        hasNextPage
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Controlador para obtener un producto por su ID
export const getProductByID = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'ID de producto no válido' });
    }

    const product = await Product.findById(req.params.id).populate('Brand');

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para actualizar un producto por su ID
export const updateProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'ID de producto no válido' });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Se requiere al menos un campo para actualizar' });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controlador para eliminar un producto por su ID
export const deleteProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'ID de producto no válido' });
    }

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
