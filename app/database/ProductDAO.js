"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDAO = void 0;
// Object Model Dependencies
const Product_1 = require("../models/Product");
// MySQL Module Dependency
const mysql = __importStar(require("mysql"));
// Util Module Dependency
const util = __importStar(require("util"));
class ProductDAO {
    constructor(host, username, password) {
        this.host = host;
        this.username = username;
        this.password = password;
        this.pool = mysql.createPool({
            host: this.host,
            user: this.username,
            password: this.password,
            database: 'f21o3d52t6wthb4u'
        });
    }
    getAllProducts(callback) {
        // List of Users to return
        let products = [];
        // Get a pooled connection to the database
        this.pool.getConnection(function (err, connection) {
            // Throw error if exists
            if (err)
                throw err;
            // run query
            connection.query('SELECT * FROM product', function (err, rows, fields) {
                // Release connection in the pool
                connection.release();
                // Throw error if exists
                if (err)
                    throw err;
                // Loop over resilts and populate return array
                for (let i = 0; i < rows.length; i++) {
                    products.push(new Product_1.Product(rows[i].ID, rows[i].Name, rows[i].Description, rows[i].Price, rows[i].Quantity, rows[i].Image));
                }
                // Do a callback to return results
                callback(products);
            });
        });
    }
    getProductByID(ID, callback) {
        // Get a pooled connection to the database
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function* () {
                // Throw error if exists
                if (err)
                    throw err;
                connection.query = util.promisify(connection.query);
                let result = yield connection.query('SELECT * FROM product WHERE ID = ?', [ID]);
                let product = new Product_1.Product(result[0].ID, result[0].Name, result[0].Description, result[0].Price, result[0].Quantity, result[0].Image);
                callback(product);
            });
        });
    }
    searchByName(name, callback) {
        let products = [];
        // Get a pooled connection to the database
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function* () {
                // Throw error if exists
                if (err)
                    throw err;
                connection.query = util.promisify(connection.query);
                let result = yield connection.query('SELECT * FROM product WHERE Name LIKE ?', [name]);
                for (let i = 0; i < result.length; i++) {
                    products.push(new Product_1.Product(result[i].ID, result[i].Name, result[i].Description, result[i].Price, result[i].Quantity, result[i].Image));
                }
                callback(products);
            });
        });
    }
    searchByDesc(desc, callback) {
        let products = [];
        // Get a pooled connection to the database
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function* () {
                // Throw error if exists
                if (err)
                    throw err;
                connection.query = util.promisify(connection.query);
                let result = yield connection.query('SELECT * FROM product WHERE Description LIKE ?', [desc]);
                for (let i = 0; i < result.length; i++) {
                    products.push(new Product_1.Product(result[i].ID, result[i].Name, result[i].Description, result[i].Price, result[i].Quantity, result[i].Image));
                }
                callback(products);
            });
        });
    }
    create(product, callback) {
        // Get a pooled connection to the database
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function* () {
                // Throw error if exists
                if (err)
                    throw err;
                connection.query = util.promisify(connection.query);
                let result = yield connection.query(`INSERT INTO product (Name, Description, Price, Quantity, Image) VALUES ('${product.name}', '${product.description}', '${product.price}', '${product.quantity}', '${product.image}')`);
                if (result.affectedRows == 1) {
                    callback(200);
                }
                else {
                    callback(500);
                }
            });
        });
    }
    update(product, callback) {
        // Get a pooled connection to the database
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function* () {
                // Throw error if exists
                if (err)
                    throw err;
                connection.query = util.promisify(connection.query);
                let result = yield connection.query(`UPDATE product SET Name = '${product.name}', Description = '${product.description}', Price = '${product.price}', Quantity = '${product.quantity}', Image = '${product.image}' WHERE ID = '${product.ID}'`);
                if (result.affectedRows == 1) {
                    callback(200);
                }
                else {
                    callback(500);
                }
            });
        });
    }
    delete(productID, callback) {
        // Get a pooled connection to the database
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function* () {
                // Throw error if exists
                if (err)
                    throw err;
                connection.query = util.promisify(connection.query);
                let result = yield connection.query(`DELETE FROM product WHERE ID = '${productID}' LIMIT 1`);
                if (result.affectedRows == 1) {
                    callback(200);
                }
                else {
                    callback(500);
                }
            });
        });
    }
}
exports.ProductDAO = ProductDAO;
