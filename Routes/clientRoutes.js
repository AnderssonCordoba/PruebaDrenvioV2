import express from 'express'; 
import { addClient, getAllClients, getClientByID, updateClient, deleteClient, addBrandToClient } from '../Controllers/clientControllers.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Operaciones relacionadas con los clientes
 */

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Agregar un nuevo cliente
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identificacion:
 *                 type: number
 *               nombre:
 *                 type: string
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string 
 *             example:
 *               identificacion: 123456
 *               nombre: Cliente1
 *               telefono: 123456789
 *               email: cliente1@example.com 
 *     responses:
 *       '201':
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 identificacion:
 *                   type: number
 *                 nombre:
 *                   type: string
 *                 telefono:
 *                   type: string
 *                 email:
 *                   type: string 
 *       '400':
 *         description: Error en la solicitud o campos faltantes
 *       '500':
 *         description: Error interno del servidor
 */
router.post('/', addClient);

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clients]
 *     responses:
 *       '200':
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   identificacion:
 *                     type: number
 *                   nombre:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   email:
 *                     type: string
 *                   specialBrands:
 *                     type: array
 *                   Sales:
 *                     type: array
 *                     items:
 *                       type: string
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/', getAllClients);

/**
 * @swagger
 * /clients/{identificacion}:
 *   get:
 *     summary: Obtener un cliente por su Identificacion
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: identificacion
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificación del cliente
 *     responses:
 *       '200':
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 identificacion:
 *                   type: number
 *                 nombre:
 *                   type: string
 *                 telefono:
 *                   type: string
 *                 email:
 *                   type: string
 *                 specialBrands:
 *                   type: array
 *                   items:
 *                     type: string
 *       '400':
 *         description: ID de cliente no válido
 *       '404':
 *         description: Cliente no encontrado
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/:identificacion', getClientByID);

/**
 * @swagger
 * /clients/{identificacion}:
 *   put:
 *     summary: Actualizar un cliente por su Identificacion
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: identificacion
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificación del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *               specialBrands:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               nombre: ClienteActualizado
 *               telefono: 987654321
 *               email: clienteactualizado@example.com 
 *     responses:
 *       '200':
 *         description: Cliente actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 telefono:
 *                   type: string
 *                 email:
 *                   type: string 
 *       '400':
 *         description: ID de cliente no válido o error de validación
 *       '404':
 *         description: Cliente no encontrado
 *       '500':
 *         description: Error interno del servidor
 */
router.put('/:identificacion', updateClient);

/**
 * @swagger
 * /clients/{identificacion}:
 *   delete:
 *     summary: Eliminar un cliente por su Identificacion
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: identificacion
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificacion del cliente
 *     responses:
 *       '200':
 *         description: Cliente eliminado correctamente
 *       '400':
 *         description: ID de cliente no válido
 *       '404':
 *         description: Cliente no encontrado
 *       '500':
 *         description: Error interno del servidor
 */
router.delete('/:identificacion', deleteClient);


/**
 * @swagger
 * /clients/{identificacion}/brands:
 *   post:
 *     summary: Agregar una marca a un cliente por su Identificacion
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: identificacion
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificacion del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandId:
 *                 type: string
 *             example:
 *               brandId: 6151691de1bcb76e75c4abf1
 *     responses:
 *       '200':
 *         description: Marca agregada al cliente correctamente
 *       '400':
 *         description: ID de marca no válido o error de validación
 *       '404':
 *         description: Cliente no encontrado o Marca no encontrada
 *       '500':
 *         description: Error interno del servidor
 */
router.post('/:identificacion/brands', addBrandToClient);
export default router;
