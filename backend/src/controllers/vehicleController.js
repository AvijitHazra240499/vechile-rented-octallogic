const prisma = require('../config/prisma');
const { Prisma } = require('@prisma/client');

// Get all vehicle types
exports.getVehicleTypes = async (req, res) => {
  try {
    const types = await prisma.vehicleType.findMany();
    res.json(types);
  } catch (error) {
    console.error('Error fetching vehicle types:', error);
    res.status(500).json({ error: 'Failed to fetch vehicle types' });
  }
};

// Get vehicles by type
exports.getVehiclesByType = async (req, res) => {
  try {
    const { typeId } = req.params;
    const vehicles = await prisma.vehicle.findMany({
      where: { vehicleTypeId: parseInt(typeId) },
      include: { vehicleType: true }
    });
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles by type:', error);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
};

// Check vehicle availability
exports.checkAvailability = async (req, res) => {
  try {
    const { vehicleId, startDate, endDate } = req.query;
    
    // Convert string dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Check for existing bookings that overlap with the requested dates
    const existingBooking = await prisma.booking.findFirst({
      where: {
        vehicleId: parseInt(vehicleId),
        OR: [
          {
            // Booking starts during the requested period
            startDate: { lte: end },
            endDate: { gte: start }
          },
          {
            // Booking ends during the requested period
            startDate: { lte: end },
            endDate: { gte: start }
          },
          {
            // Booking completely contains the requested period
            AND: [
              { startDate: { lte: start } },
              { endDate: { gte: end } }
            ]
          }
        ]
      }
    });

    res.json({ available: !existingBooking });
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({ error: 'Failed to check availability' });
  }
};
