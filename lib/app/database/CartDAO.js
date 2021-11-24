"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CartDAO = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Cart = require("../models/Cart");

var mysql = _interopRequireWildcard(require("mysql"));

var util = _interopRequireWildcard(require("util"));

var _Product = require("../models/Product");

// Object Model Dependencies
// MySQL Module Dependency
// Util Module Dependency
var CartDAO = /*#__PURE__*/function () {
  function CartDAO(host, username, password) {
    (0, _classCallCheck2["default"])(this, CartDAO);
    (0, _defineProperty2["default"])(this, "host", void 0);
    (0, _defineProperty2["default"])(this, "username", void 0);
    (0, _defineProperty2["default"])(this, "password", void 0);
    (0, _defineProperty2["default"])(this, "pool", void 0);
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

  (0, _createClass2["default"])(CartDAO, [{
    key: "getAllCarts",
    value: function getAllCarts(callback) {
      // List of Users to return
      var carts = []; // Get a pooled connection to the database

      this.pool.getConnection(function (err, connection) {
        // Throw error if exists
        if (err) throw err; // run query

        connection.query('SELECT * FROM cart', function (err, rows, fields) {
          // Release connection in the pool
          connection.release(); // Throw error if exists

          if (err) throw err; // Loop over resilts and populate return array

          for (var i = 0; i < rows.length; i++) {
            carts.push(new _Cart.Cart(rows[i].ID, rows[i].userID));
          } // Do a callback to return results


          callback(carts);
        });
      });
    }
  }, {
    key: "getCartByID",
    value: function getCartByID(ID, callback) {
      // Get a pooled connection to the database
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, connection) {
          var result, cart;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!err) {
                    _context.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  connection.query = util.promisify(connection.query);
                  _context.next = 5;
                  return connection.query('SELECT * FROM cart WHERE ID = ?', [ID]);

                case 5:
                  result = _context.sent;
                  cart = new _Cart.Cart(ID, result[0].userID);
                  callback(cart);

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "getCartByUser",
    value: function getCartByUser(userID, callback) {
      // Get a pooled connection to the database
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err, connection) {
          var result, cart;
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!err) {
                    _context2.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  connection.query = util.promisify(connection.query);
                  _context2.next = 5;
                  return connection.query('SELECT * FROM cart WHERE userID = ?', [userID]);

                case 5:
                  result = _context2.sent;
                  cart = new _Cart.Cart(result[0].ID, result[0].userID);
                  callback(cart);

                case 8:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "getCartProducts",
    value: function getCartProducts(ID, callback) {
      var products = []; // Get a pooled connection to the database

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(err, connection) {
          var result, i;
          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!err) {
                    _context3.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  connection.query = util.promisify(connection.query);
                  _context3.next = 5;
                  return connection.query('SELECT * FROM cartproduct WHERE cartID = ?', [ID]);

                case 5:
                  result = _context3.sent;

                  for (i = 0; i < result.length; i++) {
                    products.push(new _Product.Product(result[i].ID, result[i].Name, result[i].Description, result[i].Price, result[i].Quantity, result[i].Image));
                  }

                  callback(products);

                case 8:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "create",
    value: function create(userID, callback) {
      // Get a pooled connection to the database
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(err, connection) {
          var result;
          return _regenerator["default"].wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (!err) {
                    _context4.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  connection.query = util.promisify(connection.query);
                  _context4.next = 5;
                  return connection.query("INSERT INTO cart (userID) VALUES ('".concat(userID, "')"));

                case 5:
                  result = _context4.sent;

                  if (result.affectedRows == 1) {
                    callback(200);
                  } else {
                    callback(500);
                  }

                case 7:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        return function (_x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "add",
    value: function add(product, cartID, callback) {
      // Get a pooled connection to the database
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(err, connection) {
          var result;
          return _regenerator["default"].wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  if (!err) {
                    _context5.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  connection.query = util.promisify(connection.query);
                  _context5.next = 5;
                  return connection.query("INSERT INTO cartproduct (Name, Description, Price, Quantity, Image, cartID, productID) VALUES ('".concat(product.name, "', '").concat(product.description, "', '").concat(product.price, "', '1', '").concat(product.image, "', '").concat(cartID, "', '").concat(product.ID, "')"));

                case 5:
                  result = _context5.sent;

                  if (result.affectedRows == 1) {
                    callback(200);
                  } else {
                    callback(500);
                  }

                case 7:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        return function (_x9, _x10) {
          return _ref5.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "remove",
    value: function remove(productID, cartID, callback) {
      // Get a pooled connection to the database
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(err, connection) {
          var result;
          return _regenerator["default"].wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  if (!err) {
                    _context6.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  connection.query = util.promisify(connection.query);
                  _context6.next = 5;
                  return connection.query("DELETE FROM cartproduct WHERE productID = '".concat(productID, "' AND cartID = '").concat(cartID, "' LIMIT 1"));

                case 5:
                  result = _context6.sent;

                  if (result.affectedRows == 1) {
                    callback(200);
                  } else {
                    callback(500);
                  }

                case 7:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }));

        return function (_x11, _x12) {
          return _ref6.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "update",
    value: function update(cart, callback) {
      // Get a pooled connection to the database
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(err, connection) {
          var result;
          return _regenerator["default"].wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  if (!err) {
                    _context7.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  connection.query = util.promisify(connection.query);
                  _context7.next = 5;
                  return connection.query("UPDATE cart SET userID = '".concat(cart.userID, "' WHERE ID = '").concat(cart.ID, "'"));

                case 5:
                  result = _context7.sent;

                  if (result.affectedRows == 1) {
                    callback(200);
                  } else {
                    callback(500);
                  }

                case 7:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7);
        }));

        return function (_x13, _x14) {
          return _ref7.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "delete",
    value: function _delete(cartID, callback) {
      // Get a pooled connection to the database
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(err, connection) {
          var result;
          return _regenerator["default"].wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  if (!err) {
                    _context8.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  connection.query = util.promisify(connection.query);
                  _context8.next = 5;
                  return connection.query("DELETE FROM cart WHERE ID = '".concat(cartID, "' LIMIT 1"));

                case 5:
                  result = _context8.sent;

                  if (result.affectedRows == 1) {
                    callback(200);
                  } else {
                    callback(500);
                  }

                case 7:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8);
        }));

        return function (_x15, _x16) {
          return _ref8.apply(this, arguments);
        };
      }());
    }
  }]);
  return CartDAO;
}();

exports.CartDAO = CartDAO;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9DYXJ0REFPLnRzIl0sIm5hbWVzIjpbIkNhcnREQU8iLCJob3N0IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsInBvb2wiLCJteXNxbCIsImNyZWF0ZVBvb2wiLCJ1c2VyIiwiZGF0YWJhc2UiLCJjYWxsYmFjayIsImNhcnRzIiwiZ2V0Q29ubmVjdGlvbiIsImVyciIsImNvbm5lY3Rpb24iLCJxdWVyeSIsInJvd3MiLCJmaWVsZHMiLCJyZWxlYXNlIiwiaSIsImxlbmd0aCIsInB1c2giLCJDYXJ0IiwiSUQiLCJ1c2VySUQiLCJ1dGlsIiwicHJvbWlzaWZ5IiwicmVzdWx0IiwiY2FydCIsInByb2R1Y3RzIiwiUHJvZHVjdCIsIk5hbWUiLCJEZXNjcmlwdGlvbiIsIlByaWNlIiwiUXVhbnRpdHkiLCJJbWFnZSIsImFmZmVjdGVkUm93cyIsInByb2R1Y3QiLCJjYXJ0SUQiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJwcmljZSIsImltYWdlIiwicHJvZHVjdElEIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7QUFHQTs7QUFHQTs7QUFDQTs7QUFSQTtBQUdBO0FBR0E7SUFJYUEsTztBQU1ULG1CQUFZQyxJQUFaLEVBQTBCQyxRQUExQixFQUE0Q0MsUUFBNUMsRUFBOEQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQzFELFNBQUtGLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxJQUFMLEdBQVlDLEtBQUssQ0FBQ0MsVUFBTixDQUFpQjtBQUN6QkwsTUFBQUEsSUFBSSxFQUFFLEtBQUtBLElBRGM7QUFFekJNLE1BQUFBLElBQUksRUFBRSxLQUFLTCxRQUZjO0FBR3pCQyxNQUFBQSxRQUFRLEVBQUUsS0FBS0EsUUFIVTtBQUl6QkssTUFBQUEsUUFBUSxFQUFFO0FBSmUsS0FBakIsQ0FBWjtBQU1I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a0JBQUFBLFVBQVUsQ0FBQ0MsS0FBWCxHQUFtQlUsSUFBSSxDQUFDQyxTQUFMLENBQWVaLFVBQVUsQ0FBQ0MsS0FBMUIsQ0FBbkI7QUFKb0I7QUFBQSx5QkFLREQsVUFBVSxDQUFDQyxLQUFYLHdDQUFpRHVCLE1BQWpELGVBTEM7O0FBQUE7QUFLaEJYLGtCQUFBQSxNQUxnQjs7QUFPcEIsc0JBQUlBLE1BQU0sQ0FBQ1MsWUFBUCxJQUF1QixDQUEzQixFQUE4QjtBQUMxQjFCLG9CQUFBQSxRQUFRLENBQUUsR0FBRixDQUFSO0FBQ0gsbUJBRkQsTUFFTztBQUNIQSxvQkFBQUEsUUFBUSxDQUFFLEdBQUYsQ0FBUjtBQUNIOztBQVhtQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUF4Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWFIIiwic291cmNlc0NvbnRlbnQiOlsiLy8gT2JqZWN0IE1vZGVsIERlcGVuZGVuY2llc1xyXG5pbXBvcnQgeyBDYXJ0IH0gZnJvbSBcIi4uL21vZGVscy9DYXJ0XCI7XHJcblxyXG4vLyBNeVNRTCBNb2R1bGUgRGVwZW5kZW5jeVxyXG5pbXBvcnQgKiBhcyBteXNxbCBmcm9tIFwibXlzcWxcIjtcclxuXHJcbi8vIFV0aWwgTW9kdWxlIERlcGVuZGVuY3lcclxuaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwidXRpbFwiXHJcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi4vbW9kZWxzL1Byb2R1Y3RcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYXJ0REFPIHtcclxuICAgIHByaXZhdGUgaG9zdDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSB1c2VybmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBwYXNzd29yZDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBwb29sOiBteXNxbC5Qb29sO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGhvc3Q6IHN0cmluZywgdXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaG9zdCA9IGhvc3Q7XHJcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcclxuICAgICAgICB0aGlzLnBvb2wgPSBteXNxbC5jcmVhdGVQb29sKHtcclxuICAgICAgICAgICAgaG9zdDogdGhpcy5ob3N0LFxyXG4gICAgICAgICAgICB1c2VyOiB0aGlzLnVzZXJuYW1lLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCxcclxuICAgICAgICAgICAgZGF0YWJhc2U6ICdmMjFvM2Q1MnQ2d3RoYjR1J1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBbGxDYXJ0cyhjYWxsYmFjazogYW55KSB7XHJcbiAgICAgICAgLy8gTGlzdCBvZiBVc2VycyB0byByZXR1cm5cclxuICAgICAgICBsZXQgY2FydHM6IENhcnRbXSA9IFtdO1xyXG5cclxuICAgICAgICAvLyBHZXQgYSBwb29sZWQgY29ubmVjdGlvbiB0byB0aGUgZGF0YWJhc2VcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihmdW5jdGlvbiAoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkge1xyXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBleGlzdHNcclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBydW4gcXVlcnlcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSBjYXJ0JywgZnVuY3Rpb24gKGVycjogYW55LCByb3dzOiBhbnksIGZpZWxkczogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGV4aXN0c1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTG9vcCBvdmVyIHJlc2lsdHMgYW5kIHBvcHVsYXRlIHJldHVybiBhcnJheVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FydHMucHVzaChuZXcgQ2FydChyb3dzW2ldLklELCByb3dzW2ldLnVzZXJJRCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHJlc3VsdHNcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGNhcnRzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldENhcnRCeUlEKElEOiBOdW1iZXIsIGNhbGxiYWNrOiBhbnkpIHtcclxuICAgICAgICAvLyBHZXQgYSBwb29sZWQgY29ubmVjdGlvbiB0byB0aGUgZGF0YWJhc2VcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbiAoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkge1xyXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBleGlzdHNcclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXHJcblxyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSBjYXJ0IFdIRVJFIElEID0gPycsIFtJRF0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGNhcnQgPSBuZXcgQ2FydChJRCwgcmVzdWx0WzBdLnVzZXJJRCk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGNhcnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDYXJ0QnlVc2VyKHVzZXJJRDogTnVtYmVyLCBjYWxsYmFjazogYW55KSB7XHJcbiAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlXHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24gKGVycjogYW55LCBjb25uZWN0aW9uOiBhbnkpIHtcclxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgZXhpc3RzXHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxyXG5cclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gY2FydCBXSEVSRSB1c2VySUQgPSA/JywgW3VzZXJJRF0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGNhcnQgPSBuZXcgQ2FydChyZXN1bHRbMF0uSUQsIHJlc3VsdFswXS51c2VySUQpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhjYXJ0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q2FydFByb2R1Y3RzKElEOiBOdW1iZXIsIGNhbGxiYWNrOiBhbnkpIHtcclxuICAgICAgICBsZXQgcHJvZHVjdHM6IFByb2R1Y3RbXSA9IFtdO1xyXG4gICAgICAgIC8vIEdldCBhIHBvb2xlZCBjb25uZWN0aW9uIHRvIHRoZSBkYXRhYmFzZVxyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uIChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSB7XHJcbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGV4aXN0c1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcclxuXHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIGNhcnRwcm9kdWN0IFdIRVJFIGNhcnRJRCA9ID8nLCBbSURdKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0cy5wdXNoKG5ldyBQcm9kdWN0KHJlc3VsdFtpXS5JRCwgcmVzdWx0W2ldLk5hbWUsIHJlc3VsdFtpXS5EZXNjcmlwdGlvbiwgcmVzdWx0W2ldLlByaWNlLCByZXN1bHRbaV0uUXVhbnRpdHksIHJlc3VsdFtpXS5JbWFnZSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjYWxsYmFjayAocHJvZHVjdHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGUodXNlcklEOiBOdW1iZXIsIGNhbGxiYWNrOiBhbnkpIHtcclxuICAgICAgICAvLyBHZXQgYSBwb29sZWQgY29ubmVjdGlvbiB0byB0aGUgZGF0YWJhc2VcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbiAoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkge1xyXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBleGlzdHNcclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KGBJTlNFUlQgSU5UTyBjYXJ0ICh1c2VySUQpIFZBTFVFUyAoJyR7dXNlcklEfScpYCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0LmFmZmVjdGVkUm93cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAoMjAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrICg1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZChwcm9kdWN0OiBQcm9kdWN0LCBjYXJ0SUQ6IE51bWJlciwgY2FsbGJhY2s6IGFueSkge1xyXG4gICAgICAgIC8vIEdldCBhIHBvb2xlZCBjb25uZWN0aW9uIHRvIHRoZSBkYXRhYmFzZVxyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uIChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSB7XHJcbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGV4aXN0c1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoYElOU0VSVCBJTlRPIGNhcnRwcm9kdWN0IChOYW1lLCBEZXNjcmlwdGlvbiwgUHJpY2UsIFF1YW50aXR5LCBJbWFnZSwgY2FydElELCBwcm9kdWN0SUQpIFZBTFVFUyAoJyR7cHJvZHVjdC5uYW1lfScsICcke3Byb2R1Y3QuZGVzY3JpcHRpb259JywgJyR7cHJvZHVjdC5wcmljZX0nLCAnMScsICcke3Byb2R1Y3QuaW1hZ2V9JywgJyR7Y2FydElEfScsICcke3Byb2R1Y3QuSUR9JylgKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuYWZmZWN0ZWRSb3dzID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrICgyMDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgKDUwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlKHByb2R1Y3RJRDogTnVtYmVyLCBjYXJ0SUQ6IE51bWJlciwgY2FsbGJhY2s6IGFueSkge1xyXG4gICAgICAgIC8vIEdldCBhIHBvb2xlZCBjb25uZWN0aW9uIHRvIHRoZSBkYXRhYmFzZVxyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uIChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSB7XHJcbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGV4aXN0c1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoYERFTEVURSBGUk9NIGNhcnRwcm9kdWN0IFdIRVJFIHByb2R1Y3RJRCA9ICcke3Byb2R1Y3RJRH0nIEFORCBjYXJ0SUQgPSAnJHtjYXJ0SUR9JyBMSU1JVCAxYCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0LmFmZmVjdGVkUm93cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAoMjAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrICg1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGNhcnQ6IENhcnQsIGNhbGxiYWNrOiBhbnkpIHtcclxuICAgICAgICAvLyBHZXQgYSBwb29sZWQgY29ubmVjdGlvbiB0byB0aGUgZGF0YWJhc2VcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbiAoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkge1xyXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBleGlzdHNcclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KGBVUERBVEUgY2FydCBTRVQgdXNlcklEID0gJyR7Y2FydC51c2VySUR9JyBXSEVSRSBJRCA9ICcke2NhcnQuSUR9J2ApXHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0LmFmZmVjdGVkUm93cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAoMjAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrICg1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlbGV0ZShjYXJ0SUQ6IE51bWJlciwgY2FsbGJhY2s6IGFueSkge1xyXG4gICAgICAgIC8vIEdldCBhIHBvb2xlZCBjb25uZWN0aW9uIHRvIHRoZSBkYXRhYmFzZVxyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uIChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSB7XHJcbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGV4aXN0c1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoYERFTEVURSBGUk9NIGNhcnQgV0hFUkUgSUQgPSAnJHtjYXJ0SUR9JyBMSU1JVCAxYCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0LmFmZmVjdGVkUm93cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAoMjAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrICg1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=