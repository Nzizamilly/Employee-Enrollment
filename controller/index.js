const express = require('express');
const bodyParser = require('body-parser');
const ct = require('../services/index');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

// middleware

const checkInput = (req,res,next) => {
    const name = req.body.name;
    const gender = req.body.gender;
    const position = req.body.position;
    const address =req.body.address;
    if( name.length && address.length == 2 ){
        res.json({ error: 'String passed is too short or too long' });
    }else{
        next();
    };
};

app.post("/save",checkInput,(req,res) => {
    ct.createUser(`${req.body.name}`,`${req.body.gender}`,`${req.body.position}`,`${req.body.address}`);
    res.json({user:req.body});
});

/**
 * @swagger
 * /employees/save:
 *   post:
 *     summary: Save an employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employees'
 *     responses:
 *       '200':
 *         description: Successfully received Employee.
 */ 

app.get("/",async(req,res) => {
    const users = await ct.getUser();
    res.json(users);
});

/**
 * @swagger
 * /employees/:
 *   get:
 *     summary: Get all employees.
 *     responses:
 *       '200':
 *         description: Returns an array of persons.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employees'
 */

app.get("/user/:id",async(req,res) => {
    const user = await ct.getById(`${req.params.id}`);
    res.json({user});
});

/**
 * @swagger
 * /employees/user/:
 *   get:
 *     summary: Get a single employee by ID.
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID of the person.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a single person object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employees'
 *       404: 
 *          description: The employee was not found
 */

app.put("/update/:id",checkInput,(req,res) => {
    ct.UpdateUser(`${req.body.name}`,`${req.body.gender}`,`${req.body.position}`,`${req.body.address}`,`${req.params.id}`);
    res.json({message:req.body});
});

/**
 * @swagger
 * /employees/update/id:
 *   put:
 *     summary: Update an employee.
 *    
 *     requestBody:
 *       name: id
 *       in : path
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employees'
 *     responses:
 *       '200':
 *         description: Employee updated successfully.
 */ 

app.delete("/delete/:id",(req,res) => {
    ct.deleteUser(`${req.params.id}`);
    res.json("user was deleted");
});

/**
 * @swagger
 * /employees/delete/id:
 *   delete:
 *     summary: Delete a single employee by ID.
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID of the person.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a single person object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employees'
 *       404: 
 *          description: The employee was not found
 */

// app.listen(5500, () => {
//     console.log("SERVER HEARD...")
// });

module.exports = app;