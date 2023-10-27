const db = require('../repository/index');

const createUser = (name,gender,position,address) => {
    db.createUser(name,gender,position,address);
};

const getUser = async () => {
    return await db.getUser();
};

const getById = async (id) => {
    return await db.getById(id);
};

const UpdateUser = (name,gender,position,address,id) => {
    db.UpdateUser(name,gender,position,address,id);
};

const deleteUser = (id) => {
    db.deleteUser(id);
};

module.exports = {
    createUser,
    getUser,
    getById,
    UpdateUser,
    deleteUser
};