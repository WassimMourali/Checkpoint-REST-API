//appel de module express.config
const express = require('express');
const connectDB = require('./config/db');
const User = require('./models/User');
require('dotenv').config();
//declaration app express et paramétrage port de serveur
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

connectDB();

//GET :  RETURN ALL USERS 
app.get('/users', (req, res) => {
    User.find()
        .then(users => {
            console.log('\x1b[1m\x1b[33m%s\x1b[0m','---------GET Request with Postman route---------\n');
            console.log('Fetch users successful');
            res.json(users);
        })
        .catch(error => {
            console.error('Fetch users error:', error.message);
        });
});

//POST :  ADD A NEW USER TO THE DATABASE 
app.post('/users', (req, res) => {
    const { name, email, age } = req.body;
    const newUser = new User({ name, email, age });

    newUser.save()
        .then(savedUser => {
            console.log('\x1b[1m\x1b[33m%s\x1b[0m','---------POST Request with Postman route---------\n');
            console.log('User saved successfully:', savedUser);
            res.json(savedUser);
        })
        .catch(error => {
            console.error('Save user error:', error.message);
        });
});

//PUT : EDIT A USER BY ID
app.put('/users/:id', (req, res) => {
    const { name, email, age } = req.body;

    User.findByIdAndUpdate(req.params.id, { name, email, age }, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                console.log('User not found');
            }
            console.log('\x1b[1m\x1b[33m%s\x1b[0m','---------PUT Request with Postman route---------\n');
            console.log('User updated successfully:', updatedUser);
            res.json(updatedUser);
        })
        .catch(error => {
            console.error('Update user error:', error.message);
        });
});

//DELETE : REMOVE A USER BY ID 
app.delete('/users/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(deletedUser => {
            if (!deletedUser) {
                console.log('User not found');
            }
            console.log('\x1b[1m\x1b[33m%s\x1b[0m','---------DELETE Request with Postman route---------\n');
            console.log('User deleted successfully:', deletedUser);
            res.json({ msg: 'User removed' });
        })
        .catch(error => {
            console.error('Delete user error:', error.message);
        });
});

//paramétrage adresse serveur pour navigateur
app.listen(PORT, () => {
    console.log('\x1b[1m\x1b[33m%s\x1b[0m','---------Adresse Server/Port---------\n');
    console.log(`Server started on port http://localhost:${PORT}`);
});
