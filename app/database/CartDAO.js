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
exports.CartDAO = void 0;
// Object Model Dependencies
var Cart_1 = require("../models/Cart");
// MySQL Module Dependency
var mysql = require("mysql");
// Util Module Dependency
var util = require("util");
var Product_1 = require("../models/Product");
var CartDAO = /** @class */ (function () {
    function CartDAO(host, username, password) {
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
    CartDAO.prototype.getAllCarts = function (callback) {
        // List of Users to return
        var carts = [];
        // Get a pooled connection to the database
        this.pool.getConnection(function (err, connection) {
            // Throw error if exists
            if (err)
                throw err;
            // run query
            connection.query('SELECT * FROM cart', function (err, rows, fields) {
                // Release connection in the pool
                connection.release();
                // Throw error if exists
                if (err)
                    throw err;
                // Loop over resilts and populate return array
                for (var i = 0; i < rows.length; i++) {
                    carts.push(new Cart_1.Cart(rows[i].ID, rows[i].userID));
                }
                // Do a callback to return results
                callback(carts);
            });
        });
    };
    CartDAO.prototype.getCartByID = function (ID, callback) {
        // Get a pooled connection to the database
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function () {
                var result, cart;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Throw error if exists
                            if (err)
                                throw err;
                            connection.query = util.promisify(connection.query);
                            return [4 /*yield*/, connection.query('SELECT * FROM cart WHERE ID = ?', [ID])];
                        case 1:
                            result = _a.sent();
                            cart = new Cart_1.Cart(ID, result[0].userID);
                            callback(cart);
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    CartDAO.prototype.getCartByUser = function (userID, callback) {
        // Get a pooled connection to the database
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function () {
                var result, cart;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Throw error if exists
                            if (err)
                                throw err;
                            connection.query = util.promisify(connection.query);
                            return [4 /*yield*/, connection.query('SELECT * FROM cart WHERE userID = ?', [userID])];
                        case 1:
                            result = _a.sent();
                            cart = new Cart_1.Cart(result[0].ID, result[0].userID);
                            callback(cart);
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    CartDAO.prototype.getCartProducts = function (ID, callback) {
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
                            return [4 /*yield*/, connection.query('SELECT * FROM cartproduct WHERE cartID = ?', [ID])];
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
    CartDAO.prototype.create = function (userID, callback) {
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
                            return [4 /*yield*/, connection.query("INSERT INTO cart (userID) VALUES ('" + userID + "')")];
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
    CartDAO.prototype.add = function (product, cartID, callback) {
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
                            return [4 /*yield*/, connection.query("INSERT INTO cartproduct (Name, Description, Price, Quantity, Image, cartID, productID) VALUES ('" + product.name + "', '" + product.description + "', '" + product.price + "', '1', '" + product.image + "', '" + cartID + "', '" + product.ID + "')")];
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
    CartDAO.prototype.remove = function (productID, cartID, callback) {
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
                            return [4 /*yield*/, connection.query("DELETE FROM cartproduct WHERE ID = '" + productID + "' AND cartID = '" + cartID + "' LIMIT 1")];
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
    CartDAO.prototype.update = function (cart, callback) {
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
                            return [4 /*yield*/, connection.query("UPDATE cart SET userID = '" + cart.userID + "' WHERE ID = '" + cart.ID + "'")];
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
    CartDAO.prototype["delete"] = function (cartID, callback) {
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
                            return [4 /*yield*/, connection.query("DELETE FROM cart WHERE ID = '" + cartID + "' LIMIT 1")];
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
    return CartDAO;
}());
exports.CartDAO = CartDAO;
