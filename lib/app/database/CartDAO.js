"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9DYXJ0REFPLnRzIl0sIm5hbWVzIjpbIkNhcnREQU8iLCJob3N0IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsInBvb2wiLCJteXNxbCIsImNyZWF0ZVBvb2wiLCJ1c2VyIiwiZGF0YWJhc2UiLCJjYWxsYmFjayIsImNhcnRzIiwiZ2V0Q29ubmVjdGlvbiIsImVyciIsImNvbm5lY3Rpb24iLCJxdWVyeSIsInJvd3MiLCJmaWVsZHMiLCJyZWxlYXNlIiwiaSIsImxlbmd0aCIsInB1c2giLCJDYXJ0IiwiSUQiLCJ1c2VySUQiLCJ1dGlsIiwicHJvbWlzaWZ5IiwicmVzdWx0IiwiY2FydCIsInByb2R1Y3RzIiwiUHJvZHVjdCIsIk5hbWUiLCJEZXNjcmlwdGlvbiIsIlByaWNlIiwiUXVhbnRpdHkiLCJJbWFnZSIsImFmZmVjdGVkUm93cyIsInByb2R1Y3QiLCJjYXJ0SUQiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJwcmljZSIsImltYWdlIiwicHJvZHVjdElEIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7QUFHQTs7QUFHQTs7QUFDQTs7Ozs7O0FBUkE7QUFHQTtBQUdBO0lBSWFBLE87QUFNVCxtQkFBWUMsSUFBWixFQUEwQkMsUUFBMUIsRUFBNENDLFFBQTVDLEVBQThEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUMxRCxTQUFLRixJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQyxLQUFLLENBQUNDLFVBQU4sQ0FBaUI7QUFDekJMLE1BQUFBLElBQUksRUFBRSxLQUFLQSxJQURjO0FBRXpCTSxNQUFBQSxJQUFJLEVBQUUsS0FBS0wsUUFGYztBQUd6QkMsTUFBQUEsUUFBUSxFQUFFLEtBQUtBLFFBSFU7QUFJekJLLE1BQUFBLFFBQVEsRUFBRTtBQUplLEtBQWpCLENBQVo7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cEJDLGtCQUFBQSxVQUFVLENBQUNDLEtBQVgsR0FBbUJVLElBQUksQ0FBQ0MsU0FBTCxDQUFlWixVQUFVLENBQUNDLEtBQTFCLENBQW5CO0FBSm9CO0FBQUEseUJBS0RELFVBQVUsQ0FBQ0MsS0FBWCx3Q0FBaUR1QixNQUFqRCxlQUxDOztBQUFBO0FBS2hCWCxrQkFBQUEsTUFMZ0I7O0FBT3BCLHNCQUFJQSxNQUFNLENBQUNTLFlBQVAsSUFBdUIsQ0FBM0IsRUFBOEI7QUFDMUIxQixvQkFBQUEsUUFBUSxDQUFFLEdBQUYsQ0FBUjtBQUNILG1CQUZELE1BRU87QUFDSEEsb0JBQUFBLFFBQVEsQ0FBRSxHQUFGLENBQVI7QUFDSDs7QUFYbUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBeEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFhSCIsInNvdXJjZXNDb250ZW50IjpbIi8vIE9iamVjdCBNb2RlbCBEZXBlbmRlbmNpZXNcbmltcG9ydCB7IENhcnQgfSBmcm9tIFwiLi4vbW9kZWxzL0NhcnRcIjtcblxuLy8gTXlTUUwgTW9kdWxlIERlcGVuZGVuY3lcbmltcG9ydCAqIGFzIG15c3FsIGZyb20gXCJteXNxbFwiO1xuXG4vLyBVdGlsIE1vZHVsZSBEZXBlbmRlbmN5XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJ1dGlsXCJcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi4vbW9kZWxzL1Byb2R1Y3RcIjtcblxuZXhwb3J0IGNsYXNzIENhcnREQU8ge1xuICAgIHByaXZhdGUgaG9zdDogc3RyaW5nO1xuICAgIHByaXZhdGUgdXNlcm5hbWU6IHN0cmluZztcbiAgICBwcml2YXRlIHBhc3N3b3JkOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBwb29sOiBteXNxbC5Qb29sO1xuXG4gICAgY29uc3RydWN0b3IoaG9zdDogc3RyaW5nLCB1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuaG9zdCA9IGhvc3Q7XG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcbiAgICAgICAgdGhpcy5wYXNzd29yZCA9IHBhc3N3b3JkO1xuICAgICAgICB0aGlzLnBvb2wgPSBteXNxbC5jcmVhdGVQb29sKHtcbiAgICAgICAgICAgIGhvc3Q6IHRoaXMuaG9zdCxcbiAgICAgICAgICAgIHVzZXI6IHRoaXMudXNlcm5hbWUsXG4gICAgICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCxcbiAgICAgICAgICAgIGRhdGFiYXNlOiAnZjIxbzNkNTJ0Nnd0aGI0dSdcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEFsbENhcnRzKGNhbGxiYWNrOiBhbnkpIHtcbiAgICAgICAgLy8gTGlzdCBvZiBVc2VycyB0byByZXR1cm5cbiAgICAgICAgbGV0IGNhcnRzOiBDYXJ0W10gPSBbXTtcblxuICAgICAgICAvLyBHZXQgYSBwb29sZWQgY29ubmVjdGlvbiB0byB0aGUgZGF0YWJhc2VcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oZnVuY3Rpb24gKGVycjogYW55LCBjb25uZWN0aW9uOiBhbnkpIHtcbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGV4aXN0c1xuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIHJ1biBxdWVyeVxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSBjYXJ0JywgZnVuY3Rpb24gKGVycjogYW55LCByb3dzOiBhbnksIGZpZWxkczogYW55KSB7XG4gICAgICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBleGlzdHNcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcblxuICAgICAgICAgICAgICAgIC8vIExvb3Agb3ZlciByZXNpbHRzIGFuZCBwb3B1bGF0ZSByZXR1cm4gYXJyYXlcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY2FydHMucHVzaChuZXcgQ2FydChyb3dzW2ldLklELCByb3dzW2ldLnVzZXJJRCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHJlc3VsdHNcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhjYXJ0cyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENhcnRCeUlEKElEOiBOdW1iZXIsIGNhbGxiYWNrOiBhbnkpIHtcbiAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uIChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSB7XG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBleGlzdHNcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxuXG5cbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIGNhcnQgV0hFUkUgSUQgPSA/JywgW0lEXSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBjYXJ0ID0gbmV3IENhcnQoSUQsIHJlc3VsdFswXS51c2VySUQpO1xuICAgICAgICAgICAgY2FsbGJhY2soY2FydCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDYXJ0QnlVc2VyKHVzZXJJRDogTnVtYmVyLCBjYWxsYmFjazogYW55KSB7XG4gICAgICAgIC8vIEdldCBhIHBvb2xlZCBjb25uZWN0aW9uIHRvIHRoZSBkYXRhYmFzZVxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbiAoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkge1xuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgZXhpc3RzXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcblxuXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSBjYXJ0IFdIRVJFIHVzZXJJRCA9ID8nLCBbdXNlcklEXSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBjYXJ0ID0gbmV3IENhcnQocmVzdWx0WzBdLklELCByZXN1bHRbMF0udXNlcklEKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGNhcnQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Q2FydFByb2R1Y3RzKElEOiBOdW1iZXIsIGNhbGxiYWNrOiBhbnkpIHtcbiAgICAgICAgbGV0IHByb2R1Y3RzOiBQcm9kdWN0W10gPSBbXTtcbiAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uIChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSB7XG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBleGlzdHNcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxuXG5cbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIGNhcnRwcm9kdWN0IFdIRVJFIGNhcnRJRCA9ID8nLCBbSURdKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0cy5wdXNoKG5ldyBQcm9kdWN0KHJlc3VsdFtpXS5JRCwgcmVzdWx0W2ldLk5hbWUsIHJlc3VsdFtpXS5EZXNjcmlwdGlvbiwgcmVzdWx0W2ldLlByaWNlLCByZXN1bHRbaV0uUXVhbnRpdHksIHJlc3VsdFtpXS5JbWFnZSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYWxsYmFjayAocHJvZHVjdHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlKHVzZXJJRDogTnVtYmVyLCBjYWxsYmFjazogYW55KSB7XG4gICAgICAgIC8vIEdldCBhIHBvb2xlZCBjb25uZWN0aW9uIHRvIHRoZSBkYXRhYmFzZVxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbiAoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkge1xuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgZXhpc3RzXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcblxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoYElOU0VSVCBJTlRPIGNhcnQgKHVzZXJJRCkgVkFMVUVTICgnJHt1c2VySUR9JylgKTtcblxuICAgICAgICAgICAgaWYgKHJlc3VsdC5hZmZlY3RlZFJvd3MgPT0gMSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrICgyMDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAoNTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZChwcm9kdWN0OiBQcm9kdWN0LCBjYXJ0SUQ6IE51bWJlciwgY2FsbGJhY2s6IGFueSkge1xuICAgICAgICAvLyBHZXQgYSBwb29sZWQgY29ubmVjdGlvbiB0byB0aGUgZGF0YWJhc2VcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24gKGVycjogYW55LCBjb25uZWN0aW9uOiBhbnkpIHtcbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGV4aXN0c1xuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXG5cbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KGBJTlNFUlQgSU5UTyBjYXJ0cHJvZHVjdCAoTmFtZSwgRGVzY3JpcHRpb24sIFByaWNlLCBRdWFudGl0eSwgSW1hZ2UsIGNhcnRJRCwgcHJvZHVjdElEKSBWQUxVRVMgKCcke3Byb2R1Y3QubmFtZX0nLCAnJHtwcm9kdWN0LmRlc2NyaXB0aW9ufScsICcke3Byb2R1Y3QucHJpY2V9JywgJzEnLCAnJHtwcm9kdWN0LmltYWdlfScsICcke2NhcnRJRH0nLCAnJHtwcm9kdWN0LklEfScpYCk7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQuYWZmZWN0ZWRSb3dzID09IDEpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAoMjAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgKDUwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmUocHJvZHVjdElEOiBOdW1iZXIsIGNhcnRJRDogTnVtYmVyLCBjYWxsYmFjazogYW55KSB7XG4gICAgICAgIC8vIEdldCBhIHBvb2xlZCBjb25uZWN0aW9uIHRvIHRoZSBkYXRhYmFzZVxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbiAoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkge1xuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgZXhpc3RzXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcblxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoYERFTEVURSBGUk9NIGNhcnRwcm9kdWN0IFdIRVJFIHByb2R1Y3RJRCA9ICcke3Byb2R1Y3RJRH0nIEFORCBjYXJ0SUQgPSAnJHtjYXJ0SUR9JyBMSU1JVCAxYCk7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQuYWZmZWN0ZWRSb3dzID09IDEpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAoMjAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgKDUwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZShjYXJ0OiBDYXJ0LCBjYWxsYmFjazogYW55KSB7XG4gICAgICAgIC8vIEdldCBhIHBvb2xlZCBjb25uZWN0aW9uIHRvIHRoZSBkYXRhYmFzZVxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbiAoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkge1xuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgZXhpc3RzXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcblxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoYFVQREFURSBjYXJ0IFNFVCB1c2VySUQgPSAnJHtjYXJ0LnVzZXJJRH0nIFdIRVJFIElEID0gJyR7Y2FydC5JRH0nYClcblxuICAgICAgICAgICAgaWYgKHJlc3VsdC5hZmZlY3RlZFJvd3MgPT0gMSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrICgyMDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAoNTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZShjYXJ0SUQ6IE51bWJlciwgY2FsbGJhY2s6IGFueSkge1xuICAgICAgICAvLyBHZXQgYSBwb29sZWQgY29ubmVjdGlvbiB0byB0aGUgZGF0YWJhc2VcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24gKGVycjogYW55LCBjb25uZWN0aW9uOiBhbnkpIHtcbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGV4aXN0c1xuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXG5cbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KGBERUxFVEUgRlJPTSBjYXJ0IFdIRVJFIElEID0gJyR7Y2FydElEfScgTElNSVQgMWApO1xuXG4gICAgICAgICAgICBpZiAocmVzdWx0LmFmZmVjdGVkUm93cyA9PSAxKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgKDIwMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrICg1MDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59Il19