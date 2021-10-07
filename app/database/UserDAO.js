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
exports.UserDAO = void 0;
// Object Model Dependencies
const User_1 = require("../models/User");
// MySQL Module Dependency
const mysql = __importStar(require("mysql"));
// Util Module Dependency
const util = __importStar(require("util"));
class UserDAO {
    constructor(host, username, password) {
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
    getAllUsers(callback) {
        // List of Users to return
        let users = [];
        // Get a pooled connection to the database
        this.pool.getConnection(function (err, connection) {
            // Throw error if exists
            if (err)
                throw err;
            // run query
            connection.query('SELECT * FROM user', function (err, rows, fields) {
                // Release connection in the pool
                connection.release();
                // Throw error if exists
                if (err)
                    throw err;
                // Loop over resilts and populate return array
                for (let i = 0; i < rows.length; i++) {
                    // TODO
                    users.push(new User_1.User(rows[i].ID, rows[i].FirstName, rows[i].LastName, rows[i].Email));
                }
                // Do a callback to return results
                callback(users);
            });
        });
    }
    getUserByID(ID, callback) {
        // Get a pooled connection to the database
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function* () {
                // Throw error if exists
                if (err)
                    throw err;
                connection.query = util.promisify(connection.query);
                let result = yield connection.query('SELECT * FROM user WHERE ID = ?', [ID]);
                const user = new User_1.User(result[0].ID, result[0].FirstName, result[0].LastName, result[0].Email);
                callback(user);
            });
        });
    }
    register(user, callback) {
        // Get a pooled connection to the database
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function* () {
                // Throw error if exists
                if (err)
                    throw err;
                connection.query = util.promisify(connection.query);
                let result = yield connection.query(`INSERT INTO user (FirstName, LastName, Email, Password) VALUES ('${user.firstName}', '${user.lastName}', '${user.email}', '${user.password}')`);
                if (result.affectedRows == 1) {
                    callback(200);
                }
                else {
                    callback(500);
                }
            });
        });
    }
    login(email, password, callback) {
        // Get a pooled connection to the database
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function* () {
                // Throw error if exists
                if (err)
                    throw err;
                connection.query = util.promisify(connection.query);
                let result = yield connection.query('SELECT * FROM user WHERE Email = ? AND Password = ?', [email, password]);
                if (result[0]) {
                    callback(200);
                }
                else {
                    callback(401);
                }
            });
        });
    }
    update(user, callback) {
        // Get a pooled connection to the database
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function* () {
                // Throw error if exists
                if (err)
                    throw err;
                connection.query = util.promisify(connection.query);
                let result = yield connection.query(`UPDATE user SET FirstName = '${user.firstName}', LastName = '${user.lastName}', Email = '${user.email}' WHERE ID = '${user.ID}'`);
                if (result.affectedRows == 1) {
                    callback(200);
                }
                else {
                    callback(500);
                }
            });
        });
    }
    delete(id, callback) {
        // Get a pooled connection to the database
        this.pool.getConnection(function (err, connection) {
            return __awaiter(this, void 0, void 0, function* () {
                // Throw error if exists
                if (err)
                    throw err;
                connection.query = util.promisify(connection.query);
                let result = yield connection.query(`DELETE FROM user WHERE ID = '${id}' LIMIT 1`);
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
exports.UserDAO = UserDAO;
