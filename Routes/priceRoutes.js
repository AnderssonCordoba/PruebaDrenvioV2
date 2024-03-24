import express from 'express';
import { getPrice } from '../Controllers/priceController.js';

const router = express.Router();
/**
 * @swagger
 * /price/{user_id}/{nombre_producto}:
 *   get:
 *     summary: Obtener el precio especial para un cliente y un producto específicos
 *     tags: [Price]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: string
 *       - in: path
 *         name: nombre_producto
 *         required: true
 *         description: Nombre del producto
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Precio especial obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 precio:
 *                   type: number
 *       '404':
 *         description: Cliente o producto no encontrado
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/:user_id/:nombre_producto', getPrice);

export default router;
