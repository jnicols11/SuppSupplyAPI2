// Object Model Dependencies
import { Product } from "../models/Product";

// MySQL Module Dependency
import * as mysql from "mysql";

// Util Module Dependency
import * as util from "util"

export class ProductDAO {
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
            database: 'f21o3d52t6wthb4u'
        });
    }

    public getAllProducts(callback: any) {
        // List of Users to return
        let products: Product[] = [];

        // Get a pooled connection to the database
        this.pool.getConnection(function (err: any, connection: any) {
            // Throw error if exists
            if (err) throw err
            
            // run query
            connection.query('SELECT * FROM product', function (err: any, rows: any, fields: any) {
                // Release connection in the pool
                connection.release();

                // Throw error if exists
                if (err) throw err

                // Loop over resilts and populate return array
                for (let i = 0; i < rows.length; i++) {
                    products.push(new Product(rows[i].ID, rows[i].Name, rows[i].Description, rows[i].Price, rows[i].Quantity, rows[i].Image));
                }

                // Do a callback to return results
                callback(products);
            });
        });
    }

    public getProductByID(ID: Number, callback: any) {
        // Get a pooled connection to the database
        this.pool.getConnection(async function (err: any, connection: any) {
            // Throw error if exists
            if (err) throw err


            connection.query = util.promisify(connection.query);
            let result = await connection.query('SELECT * FROM product WHERE ID = ?', [ID]);
            
            let product = new Product(result[0].ID, result[0].Name, result[0].Description, result[0].Price, result[0].Quantity, result[0].Image);

            callback(product);
        });
    }

    public searchByName(name: string, callback: any) {
        let products: Product[] = [];

        // Get a pooled connection to the database
        this.pool.getConnection(async function (err: any, connection: any) {
            // Throw error if exists
            if (err) throw err

            connection.query = util.promisify(connection.query);
            let result = await connection.query('SELECT * FROM product WHERE Name LIKE ?', [name]);

            for (let i = 0; i < result.length; i++) {
                products.push(new Product(result[i].ID, result[i].Name, result[i].Description, result[i].Price, result[i].Quantity, result[i].Image));
            }

            callback(products);
        });
    }

    public searchByDesc(desc: string, callback: any) {
        let products: Product[] = [];

        // Get a pooled connection to the database
        this.pool.getConnection(async function (err: any, connection: any) {
            // Throw error if exists
            if (err) throw err

            connection.query = util.promisify(connection.query);
            let result = await connection.query('SELECT * FROM product WHERE Description LIKE ?', [desc]);

            for (let i = 0; i < result.length; i++) {
                products.push(new Product(result[i].ID, result[i].Name, result[i].Description, result[i].Price, result[i].Quantity, result[i].Image));
            }

            callback(products);
        });
    }

    public create(product: Product, callback: any) {
        // Get a pooled connection to the database
        this.pool.getConnection(async function (err: any, connection: any) {
            // Throw error if exists
            if (err) throw err

            connection.query = util.promisify(connection.query);
            let result = await connection.query(`INSERT INTO product (Name, Description, Price, Quantity, Image) VALUES ('${product.name}', '${product.description}', '${product.price}', '${product.quantity}', '${product.image}')`);

            if (result.affectedRows == 1) {
                callback (200);
            } else {
                callback (500);
            }
        });
    }

    public update(product: Product, callback: any) {
        // Get a pooled connection to the database
        this.pool.getConnection(async function (err: any, connection: any) {
            // Throw error if exists
            if (err) throw err

            connection.query = util.promisify(connection.query);
            let result = await connection.query(`UPDATE product SET Name = '${product.name}', Description = '${product.description}', Price = '${product.price}', Quantity = '${product.quantity}', Image = '${product.image}' WHERE ID = '${product.ID}'`);

            if (result.affectedRows == 1) {
                callback (200);
            } else {
                callback (500);
            }
        });
    }

    public delete(productID: Number, callback: any) {
        // Get a pooled connection to the database
        this.pool.getConnection(async function (err: any, connection: any) {
            // Throw error if exists
            if (err) throw err

            connection.query = util.promisify(connection.query);
            let result = await connection.query(`DELETE FROM product WHERE ID = '${productID}' LIMIT 1`);

            if (result.affectedRows == 1) {
                callback (200);
            } else {
                callback (500);
            }
        });
    }
}