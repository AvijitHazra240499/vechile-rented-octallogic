// prisma/seed.js
// Seed script to populate initial data into the SQLite database.
// Run with: npm run seed

const { PrismaClient } = require('@prisma/client');

async function main() {
  console.log('Starting database seeding...');
  const prisma = new PrismaClient();

  try {
    console.log('Creating vehicle types...');
    // Create vehicle types
    const bikeType = await prisma.vehicleType.upsert({
      where: { name: 'Bike' },
      update: {},
      create: { name: 'Bike', wheelCount: 2 },
    });

    const carType = await prisma.vehicleType.upsert({
      where: { name: 'Car' },
      update: {},
      create: { name: 'Car', wheelCount: 4 },
    });

    console.log('Creating vehicles...');
    // Create vehicles
    const vehicles = [
      { model: 'Honda Shine', vehicleTypeId: bikeType.id },
      { model: 'Royal Enfield Classic 350', vehicleTypeId: bikeType.id },
      { model: 'Bajaj Pulsar 150', vehicleTypeId: bikeType.id },
      { model: 'Maruti Swift', vehicleTypeId: carType.id },
      { model: 'Hyundai i20', vehicleTypeId: carType.id },
      { model: 'Honda City', vehicleTypeId: carType.id },
      { model: 'Toyota Innova Crysta', vehicleTypeId: carType.id },
      { model: 'Mahindra Thar', vehicleTypeId: carType.id }
    ];

    await prisma.vehicle.deleteMany(); // clear existing

    await prisma.vehicle.createMany({ data: vehicles });

    // fetch vehicles again to get ids
    const allVehicles = await prisma.vehicle.findMany();

    console.log('Creating sample bookings...');
    // Create sample bookings
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const bookings = [
      {
        firstName: 'John',
        lastName: 'Doe',
        startDate: new Date(),
        endDate: tomorrow,
        vehicleId: allVehicles[0].id
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        startDate: new Date(),
        endDate: nextWeek,
        vehicleId: allVehicles[3].id
      },
      {
        firstName: 'Bob',
        lastName: 'Wilson',
        startDate: tomorrow,
        endDate: nextWeek,
        vehicleId: allVehicles[7].id
      }
    ];

    for (const booking of bookings) {
      await prisma.booking.create({ data: booking });
      console.log(`✓ Created booking for ${booking.firstName} ${booking.lastName}`);
    }

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('Prisma client disconnected');
  }
}

main();
