// Object Model Dependencies
import { Cart } from "../models/Cart";

// MySQL Module Dependency
import * as mysql from "mysql";

// Util Module Dependency
import * as util from "util"
import { Product } from "../models/Product";

export class CartDAO {
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

    public getAllCarts(callback: any) {
        // List of Users to return
        let carts: Cart[] = [];

        // Get a pooled connection to the database
        this.pool.getConnection(function (err: any, connection: any) {
            // Throw error if exists
            if (err) throw err
            
            // run query
            connection.query('SELECT * FROM cart', function (err: any, rows: any, fields: any) {
                // Release connection in the pool
                connection.release();

                // Throw error if exists
                if (err) throw err

                // Loop over resilts and populate return array
                for (let i = 0; i < rows.length; i++) {
                    carts.push(new Cart(rows[i].ID, rows[i].userID));
                }

                // Do a callback to return results
                callback(carts);
            });
        });
    }

    public getCartByID(ID: Number, callback: any) {
        // Get a pooled connection to the database
        this.pool.getConnection(async function (err: any, connection: any) {
            // Throw error if exists
            if (err) throw err


            connection.query = util.promisify(connection.query);
            let result = await connection.query('SELECT * FROM cart WHERE ID = ?', [ID]);
            
            let cart = new Cart(ID, result[0].userID);
            callback(cart);
        });
    }

    public getCartByUser(userID: Number, callback: any) {
        // Get a pooled connection to the database
        this.pool.getConnection(async function (err: any, connection: any) {
            // Throw error if exists
            if (err) throw err


            connection.query = util.promisify(connection.query);
            let result = await connection.query('SELECT * FROM cart WHERE userID = ?', [userID]);
            
            let cart = new Cart(result[0].ID, result[0].userID);
            callback(cart);
        });
    }

    public getCartProducts(ID: Number, callback: any) {
        let products: Product[] = [];
        // Get a pooled connection to the database
        this.pool.getConnection(async function (err: any, connection: any) {
            // Throw error if exists
            if (err) throw err


            connection.query = util.promisify(connection.query);
            let result = await connection.query('SELECT * FROM cartproduct WHERE cartID = ?', [ID]);
            
            for (let i = 0; i < result.length; i++) {
                products.push(new Product(result[i].ID, result[i].Name, result[i].Description, result[i].Price, result[i].Quantity, result[i].Image));
            }

            callback (products);
        });
    }

    public create(userID: number, callback: any) {
        // Get a pooled connection to the database
        this.pool.getConnection(async function (err: any, connection: any) {
            // Throw error if exists
            if (err) throw err

            connection.query = util.promisify(connection.query);
            let result = await connection.query(`INSERT INTO cart (userID) VALUES ('${userID}')`);

            if (result.affectedRows == 1) {
                callback (200);
            } else {
                callback (500);
            }
        });
    }

    public add(product: Product, cartID: number, callback: any) {
        // Get a pooled connection to the database
        this.pool.getConnection(async function (err: any, connection: any) {
            // Throw error if exists
            if (err) throw err

            connection.query = util.promisify(connection.query);
            let result = await connection.query(`INSERT INTO cartproduct (Name, Description, Price, Quantity, Image, cartID, productID) VALUES ('${product.name}', '${product.description}', '${product.price}', '1', '${product.image}', '${cartID}', '${product.ID}')`);

            if (result.affectedRows == 1) {
                callback (200);
            } else {
                callback (500);
            }
        });
    }

    public remove(productID: number, cartID: number, callback: any) {
        // Get a pooled connection to the database
        this.pool.getConnection(async function (err: any, connection: any) {
            // Throw error if exists
            if (err) throw err

            connection.query = util.promisify(connection.query);
            let result = await connection.query(`DELETE FROM cartproduct WHERE ID = '${productID}' AND cartID = '${cartID}' LIMIT 1`);

            if (result.affectedRows == 1) {
                callback (200);
            } else {
                callback (500);
            }
        })
    }

    public update(cart: Cart, callback: any) {
        // Get a pooled connection to the database
        this.pool.getConnection(async function (err: any, connection: any) {
            // Throw error if exists
            if (err) throw err

            connection.query = util.promisify(connection.query);
            let result = await connection.query(`UPDATE cart SET userID = '${cart.userID}' WHERE ID = '${cart.ID}'`)

            if (result.affectedRows == 1) {
                callback (200);
            } else {
                callback (500);
            }
        });
    }

    public delete(cartID: Number, callback: any) {
        // Get a pooled connection to the database
        this.pool.getConnection(async function (err: any, connection: any) {
            // Throw error if exists
            if (err) throw err

            connection.query = util.promisify(connection.query);
            let result = await connection.query(`DELETE FROM cart WHERE ID = '${cartID}' LIMIT 1`);

            if (result.affectedRows == 1) {
                callback (200);
            } else {
                callback (500);
            }
        });
    }
}