import express from 'express';
import { sellProduct } from '../Controllers/saleController.js';

const router = express.Router();

/**
 * @swagger
 * /sale:
 *   post:
 *     summary: Realizar una venta de producto
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID del producto a vender
 *               clientId:
 *                 type: string
 *                 description: ID del cliente que realiza la compra
 *               quantity:
 *                 type: number
 *                 description: Cantidad de productos a vender
 *             example:
 *               productId: "613d0834e7e07e001ef749c0"
 *               clientId: "613d0834e7e07e001ef749c1"
 *               quantity: 2
 *     responses:
 *       '200':
 *         description: Venta realizada con éxito
 *       '400':
 *         description: Solicitud inválida o stock insuficiente
 *       '404':
 *         description: Producto no encontrado
 *       '500':
 *         description: Error interno del servidor
 */
router.post('/', sellProduct);

export default router;