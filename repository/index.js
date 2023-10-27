const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employeeenrollement'
});

let Id = [];
let name = [];
let gender = [];
let position = [];
let address = [];

const createUser = (name,gender,position,address) => {
    const sql = `INSERT INTO employee (name,gender,position,address) VALUES ('${name}','${gender}','${position}','${address}')`
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        console.log(result);
    });
};

const getUser = async () => {
    const sql = `SELECT * FROM employee`;
    const results = await con.promise().query(sql);
    return results[0];
};

const getById = async (id) => {
    const sql = `SELECT * FROM employee WHERE id = ${id}`;
    const result = await con.promise().query(sql)
    return result[0];
};

const UpdateUser = (name,gender,position,address,id) => {
    con.query(`UPDATE employee SET name = '${name}', gender = '${gender}', position = '${position}', address = '${address}' WHERE id = ${id}`, function(err,result,fields){
        if(err) throw err;
        console.log(result)
    });
};

const deleteUser = (id) => {
    const sql = `DELETE FROM employee WHERE id = '${id}'`;
    con.query(sql,function(err,result,fields){
        if(err) throw err;
    });
};

module.exports = {
    createUser,
    getUser,
    getById,
    UpdateUser,
    deleteUser
}