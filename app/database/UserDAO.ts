// Object Model Dependencies
import { User } from "../models/User";

// MySQL Module Dependency
import * as mysql from "mysql";

// Util Module Dependency
import * as util from "util"

export class UserDAO {
    private host: string;
    private username: string;
    private password: string;
    private pool: mysql.Pool;

    constructor(host: string, username: string, password: string) {
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

    public getAllUsers(callback: any) {
        // List of Users to return
        let users: User[] = [];

        // Get a pooled connection to the database
        this.pool.getConnection(function (err: any, connection: any) {
            // Throw error if exists
            if (err) throw err
            
            // run query
            connection.query('SELECT * FROM user', function (err: any, rows: any, fields: any) {
                // Release connection in the pool
                connection.release();

                // Throw error if exists
                if (err) throw err

                // Loop over resilts and populate return array
                for (let i = 0; i < rows.length; i++) {
                    // TODO
                    users.push(new User(rows[i].ID, rows[i].FirstName, rows[i].LastName, rows[i].Email));
                }

                // Do a callback to return results
                callback(users);
            });
        });
    }

    public getUserByID(ID: Number, callback: any) {
        // Get a pooled connection to the database
        this.pool.getConnection(async function (err: any, connection: any) {
            // Throw error if exists
            if (err) throw err


            connection.query = util.promisify(connection.query);
            let result = await connection.query('SELECT * FROM user WHERE ID = ?', [ID]);
            
            const user = new User(result[0].ID, result[0].FirstName, result[0].LastName, result[0].Email);

            callback(user);
        });
    }

    public register(user: User, callback: any) {
        // Get a pooled connection to the database
        this.pool.getConnection(async function (err: any, connection: any) {
            // Throw error if exists
            if (err) throw err

            connection.query = util.promisify(connection.query);
            let result = await connection.query(`INSERT INTO user (FirstName, LastName, Email, Password) VALUES ('${user.firstName}', '${user.lastName}', '${user.email}', '${user.password}')`);

            if (result.affectedRows == 1) {
                callback (result.insertId);
            } else {
                callback (500);
            }
        });
    }

    public login(email: String, password: String, callback: any) {
        // Get a pooled connection to the database
        this.pool.getConnection(async function (err: any, connection: any) {
            // Throw error if exists
            if (err) throw err

            connection.query = util.promisify(connection.query);
            let result = await connection.query('SELECT * FROM user WHERE Email = ? AND Password = ?', [email, password]);
            if (result[0]) {
                callback (result[0]);
            }
            callback(401);
        });
    }

    public update(user: User, callback: any) {
        // Get a pooled connection to the database
        this.pool.getConnection(async function (err: any, connection: any) {
            // Throw error if exists
            if (err) throw err

            connection.query = util.promisify(connection.query);
            let result = await connection.query(`UPDATE user SET FirstName = '${user.firstName}', LastName = '${user.lastName}', Email = '${user.email}' WHERE ID = '${user.ID}'`)

            if (result.affectedRows == 1) {
                callback (200);
            } else {
                callback (500);
            }
        });
    }

    public delete(id: Number, callback: any) {
        // Get a pooled connection to the database
        this.pool.getConnection(async function (err: any, connection: any) {
            // Throw error if exists
            if (err) throw err

            connection.query = util.promisify(connection.query);
            let result = await connection.query(`DELETE FROM user WHERE ID = '${id}' LIMIT 1`);

            if (result.affectedRows == 1) {
                callback (200);
            } else {
                callback (500);
            }
        });
    }
}