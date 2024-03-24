import express from 'express';
import { addProduct, getAllProducts, getProductByID, updateProduct, deleteProduct } from '../Controllers/productoController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints para la gestión de productos
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Agregar un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               Brand:
 *                 type: string
 *               Stock:
 *                 type: number
 *               price:
 *                 type: number 
 *               special_price:
 *                 type: number 
 *             example:
 *               nombre: Producto1
 *               Brand: brandId1
 *               Stock: 10
 *               price: 100 
 *               special_price: 80 
 * 
 *     responses:
 *       '201':
 *         description: Producto creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 Brand:
 *                   type: string
 *                 Stock:
 *                   type: number
 *                 price:
 *                   type: number 
 *                 special_price:
 *                   type: number 
 *       '400':
 *         description: Error en la solicitud o campos inválidos
 *         content:
 *           application/json:
 *             example:
 *               message: Error en la solicitud o campos inválidos
 */
router.post('/', addProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos con stock
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: Lista de productos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   Brand:
 *                     type: string
 *                   Stock:
 *                     type: number
 *                   price:
 *                     type: number 
 *                   special_price:
 *                     type: number 
 *       '404':
 *         description: No se encontraron productos
 *         content:
 *           application/json:
 *             example:
 *               message: No hay productos registrados.
 */
router.get('/', getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por su ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a obtener
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Producto obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 Brand:
 *                   type: string
 *                 Stock:
 *                   type: number
 *                 price:
 *                   type: number 
 *                 special_price:
 *                   type: number 
 *       '400':
 *         description: ID de producto no válido
 *         content:
 *           application/json:
 *             example:
 *               message: ID de producto no válido
 *       '404':
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: Producto no encontrado
 */
router.get('/:id', getProductByID);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar un producto por su ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               Brand:
 *                 type: string
 *               Stock:
 *                 type: number
 *               price:
 *                 type: number 
 *               special_price:
 *                 type: number 
 *             example:
 *               nombre: ProductoActualizado
 *               Brand: brandId1
 *               Stock: 20
 *               price: 150 
 *               special_price: 100
 *     responses:
 *       '200':
 *         description: Producto actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 Brand:
 *                   type: string
 *                 Stock:
 *                   type: number
 *                 price:
 *                   type: number 
 *                 special_price:
*                    type: number 
 *       '400':
 *         description: Error en la solicitud o campos inválidos
 *         content:
 *           application/json:
 *             example:
 *               message: Error en la solicitud o campos inválidos
 *       '404':
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: Producto no encontrado
 */
router.put('/:id', updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto por su ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Producto eliminado correctamente
 *         content:
 *           application/json:
 *             example:
 *               message: Producto eliminado correctamente
 *       '400':
 *         description: ID de producto no válido
 *         content:
 *           application/json:
 *             example:
 *               message: ID de producto no válido
 *       '404':
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: Producto no encontrado
 */
router.delete('/:id', deleteProduct);

export default router;
