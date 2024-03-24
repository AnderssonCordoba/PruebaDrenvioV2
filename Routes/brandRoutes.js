import express from 'express';
import { addBrand, getAllBrands, getBrandByID, updateBrand, deleteBrand, getProductsByBrand } from '../Controllers/brandController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Operaciones relacionadas con las marcas
 */

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Agregar una nueva marca
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *             example:
 *               nombre: Nike
 *     responses:
 *       '201':
 *         description: Marca creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 nombre:
 *                   type: string
 *             example:
 *               _id: "60f21415f7344a22a8b66982" 
 *               nombre: Nike
 *       '400':
 *         description: Error en la solicitud o la marca ya existe
 *       '500':
 *         description: Error interno del servidor
 */
router.post('/', addBrand);

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Obtener todas las marcas
 *     tags: [Brands]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número máximo de marcas a devolver
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Página de resultados
 *     responses:
 *       '200':
 *         description: Marcas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 brands:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       nombre:
 *                         type: string
 *                 pageInfo:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalBrands:
 *                       type: integer
 *       '404':
 *         description: No hay marcas registradas
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/', getAllBrands);

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Obtener una marca por su ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la marca a obtener
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Marca obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 nombre:
 *                   type: string
 *       '400':
 *         description: ID de marca no válido
 *         content:
 *           application/json:
 *             example:
 *               message: ID de marca no válido
 *       '404':
 *         description: Marca no encontrada
 *         content:
 *           application/json:
 *             example:
 *               message: Marca no encontrada
 */
router.get('/:id', getBrandByID);

/**
 * @swagger
 * /brands/{id}:
 *   put:
 *     summary: Actualizar una marca por su ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la marca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *             example:
 *               nombre: Adidas
 *     responses:
 *       '200':
 *         description: Marca actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 nombre:
 *                   type: string
 *       '400':
 *         description: Error en la solicitud o ID de marca no válido
 *       '404':
 *         description: Marca no encontrada
 *       '500':
 *         description: Error interno del servidor
 */
router.put('/:id', updateBrand);

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Eliminar una marca por su ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la marca
 *     responses:
 *       '200':
 *         description: Marca eliminada exitosamente
 *       '400':
 *         description: ID de marca no válido
 *       '404':
 *         description: Marca no encontrada
 *       '500':
 *         description: Error interno del servidor
 */
router.delete('/:id', deleteBrand);
/**
 * @swagger
 * /brands/{id}/products:
 *   get:
 *     summary: Obtener todos los productos asociados a una marca por su ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la marca
 *     responses:
 *       '200':
 *         description: Productos obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   Brand:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       nombre:
 *                         type: string
 *                   Stock:
 *                     type: number
 *                   price:
 *                     type: number
 *                   especialPrice:
 *                     type: number
 *       '400':
 *         description: ID de marca no válido
 *       '404':
 *         description: No se encontraron productos asociados a la marca
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/:id/products', getProductsByBrand);


export default router;
