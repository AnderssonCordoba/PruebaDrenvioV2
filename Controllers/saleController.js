import Sale from '../Models/saleSchema .js';
import Product from '../Models/productSchema.js';
import Client from '../Models/clientSChema.js';

export const sellProduct = async (req, res) => {
  try {
    const { productId, clientId, quantity } = req.body;

    // Verificar si el stock del producto es suficiente
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    if (product.Stock < quantity) {
      return res.status(400).json({ message: 'Stock insuficiente' });
    }

    // Verificar si el cliente existe
    const client = await Client.findOne(req.params.clientId);
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    // Actualizar el stock del producto
    product.Stock -= quantity;
    await product.save();

    // Crear y guardar la venta en la tabla Sale
    const sale = new Sale({
      productId, 
      quantity,
      date: Date.now()
    });
    await sale.save();

    // Agregar la venta al cliente
    client.Sales.push(sale);
    await client.save();

    res.status(200).json({ message: 'Venta realizada con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
