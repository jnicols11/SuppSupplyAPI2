"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ProductDAO = void 0;
// Object Model Dependencies
var Product_1 = require("../models/Product");
// MySQL Module Dependency
var mysql = require("mysql");
// Util Module Dependency
var util = require("util");
var ProductDAO = /** @class */ (function () {
    function ProductDAO(host, username, password) {
        this.host = host;
        this.username = username;
        this.password = password;
        this.pool = mysql.createPool({
            host: this.host,
            user: this.username,
            password: this.password,
            database: 'suppsupply'
        });
    }
    ProductDAO.prototype.getAllProducts = function (callback) {
        // List of Users to return
        var products = [];
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
                for (var i = 0; i < rows.length; i++) {
                    products.push(new Product_1.Product(rows[i].ID, rows[i].Name, rows[i].Description, rows[i].Price, rows[i].Quantity, rows[i].Image));
                }
                // Do a callback to return results
                callback(products);
            });
        });
    };
    ProductDAO.prototype.getProductByID = function (ID, callback) {
        // Get a pooled connection to the database
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function () {
                var result, product;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Throw error if exists
                            if (err)
                                throw err;
                            connection.query = util.promisify(connection.query);
                            return [4 /*yield*/, connection.query('SELECT * FROM product WHERE ID = ?', [ID])];
                        case 1:
                            result = _a.sent();
                            product = new Product_1.Product(result[0].ID, result[0].Name, result[0].Description, result[0].Price, result[0].Quantity, result[0].Image);
                            callback(product);
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    ProductDAO.prototype.searchByName = function (name, callback) {
        var products = [];
        // Get a pooled connection to the database
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function () {
                var result, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Throw error if exists
                            if (err)
                                throw err;
                            connection.query = util.promisify(connection.query);
                            return [4 /*yield*/, connection.query('SELECT * FROM product WHERE Name LIKE ?', [name])];
                        case 1:
                            result = _a.sent();
                            for (i = 0; i < result.length; i++) {
                                products.push(new Product_1.Product(result[i].ID, result[i].Name, result[i].Description, result[i].Price, result[i].Quantity, result[i].Image));
                            }
                            callback(products);
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    ProductDAO.prototype.searchByDesc = function (desc, callback) {
        var products = [];
        // Get a pooled connection to the database
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function () {
                var result, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Throw error if exists
                            if (err)
                                throw err;
                            connection.query = util.promisify(connection.query);
                            return [4 /*yield*/, connection.query('SELECT * FROM product WHERE Description LIKE ?', [desc])];
                        case 1:
                            result = _a.sent();
                            for (i = 0; i < result.length; i++) {
                                products.push(new Product_1.Product(result[i].ID, result[i].Name, result[i].Description, result[i].Price, result[i].Quantity, result[i].Image));
                            }
                            callback(products);
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    ProductDAO.prototype.create = function (product, callback) {
        // Get a pooled connection to the database
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Throw error if exists
                            if (err)
                                throw err;
                            connection.query = util.promisify(connection.query);
                            return [4 /*yield*/, connection.query("INSERT INTO product (Name, Description, Price, Quantity, Image) VALUES ('" + product.name + "', '" + product.description + "', '" + product.price + "', '" + product.quantity + "', '" + product.image + "')")];
                        case 1:
                            result = _a.sent();
                            if (result.affectedRows == 1) {
                                callback(200);
                            }
                            else {
                                callback(500);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    ProductDAO.prototype.update = function (product, callback) {
        // Get a pooled connection to the database
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Throw error if exists
                            if (err)
                                throw err;
                            connection.query = util.promisify(connection.query);
                            return [4 /*yield*/, connection.query("UPDATE product SET Name = '" + product.name + "', Description = '" + product.description + "', Price = '" + product.price + "', Quantity = '" + product.quantity + "', Image = '" + product.image + "' WHERE ID = '" + product.ID + "'")];
                        case 1:
                            result = _a.sent();
                            if (result.affectedRows == 1) {
                                callback(200);
                            }
                            else {
                                callback(500);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    ProductDAO.prototype["delete"] = function (productID, callback) {
        // Get a pooled connection to the database
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Throw error if exists
                            if (err)
                                throw err;
                            connection.query = util.promisify(connection.query);
                            return [4 /*yield*/, connection.query("DELETE FROM product WHERE ID = '" + productID + "' LIMIT 1")];
                        case 1:
                            result = _a.sent();
                            if (result.affectedRows == 1) {
                                callback(200);
                            }
                            else {
                                callback(500);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    return ProductDAO;
}());
exports.ProductDAO = ProductDAO;
