const swaggerJsdoc =require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            description: 'Swagger testing',
            version: '2',
        },
        components: {
            schemas : {
                Employees: {
                    type: 'object',                  
                    properties: {
                        id: {
                            type: 'integer',
                        },
                        name: {
                            type: 'string',
                        },
                        gender: {
                            type: 'string',
                        },
                        position: {
                            type: 'string',
                        },
                        address: {
                            type: 'string',
                        },
                        servers:["https://localhost:3000"]
                    },
                },
            },
        },
    },
    apis: ['./controller/index.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;