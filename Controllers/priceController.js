import Product from '../Models/productSchema.js';
import Client from '../Models/clientSChema.js';

export const getPrice = async (req, res) => {
  try {
    const { user_id, nombre_producto } = req.params;

    // Buscar el cliente por su ID
    const client = await Client.findById(user_id);

    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    // Buscar el producto por su nombre
    const product = await Product.findOne({ nombre: nombre_producto });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Verificar si el cliente es especial para la marca del producto
    const specialBrand = client.specialBrands.find(brandId => brandId.equals(product.Brand));

    // Devolver el precio especial si está disponible, de lo contrario, devolver el precio base
    const price = specialBrand? product.price : product.special_price;

    res.json({ precio: price });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
