const express = require('express');
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger');
const employeeRouter = require('./controller/index');

const app = express();

app.use('/who-dat', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use('/employees', employeeRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});