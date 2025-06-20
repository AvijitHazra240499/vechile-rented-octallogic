const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vehicle Rental API',
      version: '1.0.0',
      description: 'API documentation for Vehicle Rental Application',
      contact: {
        name: 'API Support',
        email: 'support@vehiclerental.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        VehicleType: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'The auto-generated id of the vehicle type' },
            name: { type: 'string', description: 'Name of the vehicle type' },
            wheelCount: { type: 'integer', description: 'Number of wheels (2 or 4)' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Vehicle: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'The auto-generated id of the vehicle' },
            name: { type: 'string', description: 'Name of the vehicle model' },
            typeId: { type: 'integer', description: 'Reference to the vehicle type' },
            imageUrl: { type: 'string', description: 'URL of the vehicle image' },
            pricePerDay: { type: 'number', format: 'float', description: 'Rental price per day' },
            isAvailable: { type: 'boolean', description: 'Current availability status' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            VehicleType: { $ref: '#/components/schemas/VehicleType' }
          }
        },
        Booking: {
          type: 'object',
          required: ['vehicleId', 'startDate', 'endDate', 'firstName', 'lastName'],
          properties: {
            id: { type: 'integer', description: 'The auto-generated id of the booking', readOnly: true },
            vehicleId: { 
              type: 'integer', 
              description: 'Reference to the booked vehicle',
              example: 1
            },
            firstName: { 
              type: 'string', 
              description: 'First name of the customer',
              example: 'John'
            },
            lastName: { 
              type: 'string', 
              description: 'Last name of the customer',
              example: 'Doe'
            },
            startDate: { 
              type: 'string', 
              format: 'date', 
              description: 'Booking start date (YYYY-MM-DD)',
              example: '2025-06-20'
            },
            endDate: { 
              type: 'string', 
              format: 'date', 
              description: 'Booking end date (YYYY-MM-DD)',
              example: '2025-06-25'
            },
            createdAt: { 
              type: 'string', 
              format: 'date-time',
              readOnly: true
            },
            updatedAt: { 
              type: 'string', 
              format: 'date-time',
              readOnly: true
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            status: { type: 'integer', description: 'HTTP status code' },
            message: { type: 'string', description: 'Error message' },
            details: { type: 'object', description: 'Additional error details' }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token for authentication. Example: Bearer {token}'
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Authentication information is missing or invalid',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                status: 401,
                message: 'Unauthorized',
                details: { error: 'Please authenticate' }
              }
            }
          }
        },
        BadRequest: {
          description: 'Invalid request data',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                status: 400,
                message: 'Validation Error',
                details: { field: 'Invalid value' }
              }
            }
          }
        },
        NotFound: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                status: 404,
                message: 'Not Found',
                details: { resource: 'Vehicle', id: 123 }
              }
            }
          }
        },
        Conflict: {
          description: 'Resource conflict',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                status: 409,
                message: 'Conflict',
                details: { message: 'Vehicle not available for the selected dates' }
              }
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = specs;
