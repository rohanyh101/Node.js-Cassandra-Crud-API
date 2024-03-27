const uuid = require('uuid');
const client = require('../config/db');
const UserController = {};

async function executeQuery(query, params) {
    try {
        const result = await client.execute(query, params, { prepare: true });
        return result.rows;
    } catch (error) {
        throw error;
    }
}

UserController.getUsers = async (req, res) => {
    const query = 'SELECT * FROM Users';

    try {
        const users = await executeQuery(query);
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

UserController.getUser = async (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Users WHERE id = ?';

    try {
        const [user] = await executeQuery(query, [id]);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

UserController.addUser = async (req, res) => {
    const { name, age, email, password } = req.body;
    const newUUID = uuid.v4();

    const query =
        'INSERT INTO Users (id, name, age, email, password) VALUES (?, ?, ?, ?, ?)';
    const params = [newUUID, name, age, email, password];

    try {
        await executeQuery(query, params);
        res.status(201).send('User created successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

UserController.deleteUser = async (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Users WHERE id = ?';

    try {
        await executeQuery(query, [id]);
        res.status(200).json('User deleted successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

UserController.updateUser = async (req, res) => {
    const id = req.params.id;
    const { name, age, email, password } = req.body;

    const query =
        'UPDATE Users SET name = ?, age = ?, email = ?, password = ? WHERE id = ?';
    const params = [name, age, email, password, id];

    try {
        await executeQuery(query, params);
        res.status(200).json('User updated successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = UserController;
