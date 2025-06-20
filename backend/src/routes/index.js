const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const bookingController = require('../controllers/bookingController');

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Vehicle management
 */

/**
 * @swagger
 * /api/vehicle-types:
 *   get:
 *     summary: Get all vehicle types
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: List of all vehicle types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VehicleType'
 */
router.get('/vehicle-types', vehicleController.getVehicleTypes);

/**
 * @swagger
 * /api/vehicles/type/{typeId}:
 *   get:
 *     summary: Get vehicles by type
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: typeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the vehicle type
 *     responses:
 *       200:
 *         description: List of vehicles of the specified type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 */
router.get('/vehicles/type/:typeId', vehicleController.getVehiclesByType);

/**
 * @swagger
 * /api/vehicles/check-availability:
 *   get:
 *     summary: Check vehicle availability
 *     tags: [Vehicles]
 *     parameters:
 *       - in: query
 *         name: vehicleId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the vehicle
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Start date in YYYY-MM-DD format
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: End date in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: Availability status of the vehicle
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 available:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.get('/vehicles/check-availability', vehicleController.checkAvailability);

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vehicleId
 *               - firstName
 *               - lastName
 *               - startDate
 *               - endDate
 *             properties:
 *               vehicleId:
 *                 type: integer
 *                 description: ID of the vehicle to book
 *                 example: 1
 *               firstName:
 *                 type: string
 *                 description: First name of the customer
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: Last name of the customer
 *                 example: Doe
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the booking (YYYY-MM-DD)
 *                 example: '2025-06-20'
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the booking (YYYY-MM-DD)
 *                 example: '2025-06-25'
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Vehicle not available for the selected dates
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/bookings', bookingController.createBooking);

module.exports = router;
