const swaggerAutogen = require('swagger-autogen')();

const outputFile = './src/swagger_output.json';
const endpointsFiles = ['./src/externals/express/routes/routes.ts'];
const port = process.env.SERVER_PORT || 3000;

const doc = {
  info: {
    version: '1.0.0',
    title: 'Scratchpay API',
    description: 'Software Engineer Challenge.',
  },
  host: `localhost:${port}`,
  basePath: '/api/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Clinic',
      description: 'Clinics API',
    },
  ],
  definitions: {
    Clinic: {
      name: 'Good Health Home',
      stateName: 'Alaska',
      availability: {
        from: '09:00',
        to: '20:00',
      },
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./src/server.ts');
});
