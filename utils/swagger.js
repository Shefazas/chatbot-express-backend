const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { version } = require('../package.json');
const dotenv = require('dotenv');

const port = process.env.PORT

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SYNARGY API Docs',
      version,
      description: 'This document provides documentation for the SYNARGY API.',
      license: {
        name: 'DataguardNxt',
        url: 'https://dataguardnxt.com/',
      },
      contact: {
        name: 'Teny Thomes , sreesayanth',
        url: 'https://dataguardnxt.com/',
        // email: 'yourname@example.com',
      },
    },
    tags: [
      {
        name: "User",
      },
      {
        name: "Permissions",
      },
      {
        name: "designations",
      },
      {
        name: "admin Dashbord",
      },
      {
        name: "countries",
      },
      {
        name: "identities",
      },
      {
        name: "Industry",
      },
      {
        name: "roles",
      },
      {
        name: "sector",
      },
      {
        name: "Segments",
      },
      {
        name: "states & City",
      },
    ],
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Local server',
      },
      {
        url: 'https://api.synergy.dgnxt.in/',
        description: 'Developement server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ["./routes/*.js", "./models/*.js"],
  
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);


module.exports =swaggerSpec;
