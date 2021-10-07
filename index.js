// Application Dependencies
const bodyParser = require('body-parser');
const { UserDAO } = require('./app/database/UserDAO');
const { ProductDAO } = require('./app/database/ProductDAO');
const { CartDAO } = require('./app/database/CartDAO');

// Create instance of an Express Application on port 3000
const express = require('express');
const { User } = require('./app/models/User');
const { Product } = require('./app/models/Product');

const app = express()
const port = 3000

// Database configuration
const dbHost = "localhost";
const dbPort = 3306;
const dbUsername = "root";
const dbPassword = "";

app.use(bodyParser.json())
app.use(express.static('app'));

// CORS Middleware
app.use(function (req, res, next) {
    // Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin");
    next();
})

// Register Routes
    // user Routes
    app.get('/users', function (req, res) {
        // Return list of all users as JSON data
        console.log('In GET ./users Route');
        let dao = new UserDAO(dbHost, dbUsername, dbPassword);
        dao.getAllUsers(function (users) {
            res.json(users);
        })
    });

    app.get('/user/:id', function (req, res) {
        console.log('In GET ./user/:id Route');

        // Get ID from request
        let ID = req.params.id;

        // Return user as JSON based on ID from database
        let dao = new UserDAO(dbHost, dbUsername, dbPassword);
        dao.getUserByID(ID, function (user) {
            res.json(user);
        })
    });

    app.post('/user/register', function (req, res) {
        console.log('In POST ./user/register Route');

        // Establish variables from request
        let firstName = req.query.firstName;
        let lastName = req.query.lastName;
        let email = req.query.email;
        let password = req.query.password;

        let user = new User(-1, firstName, lastName, email, password);

        let dao = new UserDAO(dbHost, dbUsername, dbPassword);
        dao.register(user, function (response) {
            res.json(response);
        })
    });

    app.post('/user/login', function (req, res) {
        console.log('In POST ./user/login Route');

        // Establish variables from request
        let email = req.query.email;
        let password = req.query.password;

        let dao = new UserDAO(dbHost, dbUsername, dbPassword);
        dao.login(email, password, function (response) {
            res.json(response);
        })
    });

    app.put('/user/update', function (req, res) {
        console.log('In PUT ./user/update Route');

        // Establish variables from request
        let id = req.query.id;
        let firstName = req.query.firstName;
        let lastName = req.query.lastName;
        let email = req.query.email;

        // populate user model
        let user = new User(id, firstName, lastName, email);
        
        let dao = new UserDAO(dbHost, dbUsername, dbPassword);
        dao.update(user, function (response) {
            res.json (response);
        })
    });

    app.delete('/user/delete/:id', function (req, res) {
        console.log('In DELETE ./user/delete/:id Route');

        // Get ID from request
        let id = req.params.id;

        let dao = new UserDAO(dbHost, dbUsername, dbPassword);
        dao.delete(id, function (response) {
            res.json(response);
        })
    });

    // product Routes
    app.get('/products', function (req, res) {
        // Return list of all products as JSON data
        console.log('In GET ./products Rotue');
        let dao = new ProductDAO(dbHost, dbUsername, dbPassword);
        dao.getAllProducts(function (products) {
            res.json(products);
        })
    });

    app.get('/product/:id', function (req, res) {
        console.log('In GET ./product/:id Route');

        // get ID from request
        let id = req.params.id;
        
        let dao = new ProductDAO(dbHost, dbUsername, dbPassword);
        dao.getProductByID(id, function (product) {
            res.json(product);
        })
    });

    app.get('/product/search/name/:name', function (req, res) {
        console.log('In GET ./product/search/name/:name Route');

        // get name from request
        let name = req.params.name;
        
        let dao = new ProductDAO(dbHost, dbUsername, dbPassword);
        dao.searchByName(name, function (product) {
            res.json(product);
        })
    });

    app.get('/product/search/desc/:desc', function (req, res) {
        console.log('In GET ./product/search/desc/:desc Route');

        // get desc from request
        let desc = req.params.desc;
        
        let dao = new ProductDAO(dbHost, dbUsername, dbPassword);
        dao.searchByDesc(desc, function (product) {
            res.json(product);
        })
    });

    app.post('/product/create', function (req, res) {
        console.log('In POST ./product/create Route');

        // Establish variables from request
        let name = req.query.name;
        let desc = req.query.desc;
        let price = req.query.price;
        let quantity = req.query.quantity;
        let image = req.query.image;

        // populate model
        let product = new Product(-1, name, desc, price, quantity, image);
        
        let dao = new ProductDAO(dbHost, dbUsername, dbPassword);
        dao.create(product, function (response) {
            res.json(response);
        })
    });

    app.put('/product/update', function (req, res) {
        console.log('In PUT ./product/update Route');

        // Establish Variables from Request
        let id = req.query.id;
        let name = req.query.name;
        let desc = req.query.desc;
        let price = req.query.price;
        let quantity = req.query.quantity;
        let image = req.query.image;

        // populate product model
        let product = new Product(id, name, desc, price, quantity, image);

        let dao = new ProductDAO(dbHost, dbUsername, dbPassword);
        dao.update(product, function (response) {
            res.json(response);
        })
    });

    app.delete('/product/delete/:id', function (req, res) {
        console.log('In DELETE ./product/delete/:id Route');

        // Get ID from request
        let id = req.params.id;

        let dao = new ProductDAO(dbHost, dbUsername, dbPassword);
        dao.delete(id, function (response) {
            res.json(response);
        })
    });

    // cart Routes
    app.get('/carts', function (req, res) {
        // Return list of all carts as JSON data
        console.log('In GET ./carts Route');
        let dao = new CartDAO(dbHost, dbUsername, dbPassword);
        dao.getAllCarts(function (carts) {
            res.json(carts);
        })
    });

    app.get('/cart/:id', function (req, res) {
        console.log('In GET ./cart/:id Route');

        // Get ID from request
        let id = req.params.id;

        let dao = new CartDAO(dbHost, dbUsername, dbPassword);
        dao.getCartByID(id, function (cart) {
            res.json(cart);
        })
    });

    app.get('/cart/user/:id', function (req, res) {
        console.log('In GET ./cart/user/:id Route');

        // get ID from request
        let id = req.params.id;
        
        let dao = new CartDAO(dbHost, dbUsername, dbPassword);
        dao.getCartByUser(id, function (cart) {
            res.json(cart);
        })
    });

    app.get('/cart/products/:id', function (req, res) {
        console.log('In GET ./cart/products/:id Route');

        // get ID from request
        let id = req.params.id;

        let dao = new CartDAO(dbHost, dbUsername, dbPassword);
        dao.getCartProducts(id, function (products) {
            res.json(products);
        })
    });

    app.post('/cart/create', function (req, res) {
        console.log('In POST ./cart/create Route');

        // Establish variables from request
        let userID = req.query.userID;

        let dao = new CartDAO(dbHost, dbUsername, dbPassword);
        dao.create(userID, function (response) {
            res.json(response);
        })
    });

    app.post('/cart/add', function (req, res) {
        console.log('In POST ./cart/add Route');

        // Establish variables from request
        let cartID = req.query.cartID;
        let productID = req.query.productID;

        let productDAO = new ProductDAO(dbHost, dbUsername, dbPassword);
        productDAO.getProductByID(productID, function (product) {
            let dao = new CartDAO(dbHost, dbUsername, dbPassword);
            dao.add(product, cartID, function (response) {
                res.json(response);
            })
        });
    });

    app.post('/cart/remove', function (req, res) {
        console.log('In POST ./cart/remove Route');

        // Establish variables from request
        let cartID = req.query.cartID;
        let productID = req.query.productID;

        let dao = new CartDAO(dbHost, dbUsername, dbPassword);
        dao.remove(productID, cartID, function (response) {
            res.json(response);
        })
    });

    app.put('/cart/update', function (req, res) {
        console.log('In PUT ./cart/update Route');

        // Establish Variables from Request
        let id = req.query.id;
        let userID = req.query.userID;

        // populate cart model
        let cart = new Cart(id, userID);

        let dao = new CartDAO(dbHost, dbUsername, dbPassword);
        dao.update(cart, function (response) {
            res.json(response);
        })
    });

    app.delete('/cart/delete/:id', function (req, res) {
        console.log('In DELETE ./cart/delete/:id Route');

        // Get ID from request
        let id = req.params.id;

        let dao = new CartDAO(dbHost, dbUsername, dbPassword);
        dao.delete(id, function (response) {
            res.json(response);
        })
    });

// Run application and listen
app.listen(port, () => {
    console.log(`Supp Supply API listening on port ${port}!`);
});