const prisma = require('../config/prisma');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { firstName, lastName, vehicleId, startDate, endDate } = req.body;
    
    // Convert string dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if vehicle exists
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: parseInt(vehicleId) }
    });
    
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Check if vehicle is already booked for the given dates
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

    if (existingBooking) {
      return res.status(400).json({ error: 'Vehicle is not available for the selected dates' });
    }

    // Create new booking
    const booking = await prisma.booking.create({
      data: {
        firstName,
        lastName,
        vehicleId: parseInt(vehicleId),
        startDate: start,
        endDate: end
      },
      include: {
        vehicle: true
      }
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};
