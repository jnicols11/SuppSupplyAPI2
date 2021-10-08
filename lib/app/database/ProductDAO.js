"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductDAO = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Product = require("../models/Product");

var mysql = _interopRequireWildcard(require("mysql"));

var util = _interopRequireWildcard(require("util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Object Model Dependencies
// MySQL Module Dependency
// Util Module Dependency
var ProductDAO = /*#__PURE__*/function () {
  function ProductDAO(host, username, password) {
    (0, _classCallCheck2["default"])(this, ProductDAO);
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

  (0, _createClass2["default"])(ProductDAO, [{
    key: "getAllProducts",
    value: function getAllProducts(callback) {
      // List of Users to return
      var products = []; // Get a pooled connection to the database

      this.pool.getConnection(function (err, connection) {
        // Throw error if exists
        if (err) throw err; // run query

        connection.query('SELECT * FROM product', function (err, rows, fields) {
          // Release connection in the pool
          connection.release(); // Throw error if exists

          if (err) throw err; // Loop over resilts and populate return array

          for (var i = 0; i < rows.length; i++) {
            products.push(new _Product.Product(rows[i].ID, rows[i].Name, rows[i].Description, rows[i].Price, rows[i].Quantity, rows[i].Image));
          } // Do a callback to return results


          callback(products);
        });
      });
    }
  }, {
    key: "getProductByID",
    value: function getProductByID(ID, callback) {
      // Get a pooled connection to the database
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, connection) {
          var result, product;
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
                  return connection.query('SELECT * FROM product WHERE ID = ?', [ID]);

                case 5:
                  result = _context.sent;
                  product = new _Product.Product(result[0].ID, result[0].Name, result[0].Description, result[0].Price, result[0].Quantity, result[0].Image);
                  callback(product);

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
    key: "searchByName",
    value: function searchByName(name, callback) {
      var products = []; // Get a pooled connection to the database

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err, connection) {
          var result, i;
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
                  return connection.query('SELECT * FROM product WHERE Name LIKE ?', [name]);

                case 5:
                  result = _context2.sent;

                  for (i = 0; i < result.length; i++) {
                    products.push(new _Product.Product(result[i].ID, result[i].Name, result[i].Description, result[i].Price, result[i].Quantity, result[i].Image));
                  }

                  callback(products);

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
    key: "searchByDesc",
    value: function searchByDesc(desc, callback) {
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
                  return connection.query('SELECT * FROM product WHERE Description LIKE ?', [desc]);

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
    value: function create(product, callback) {
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
                  return connection.query("INSERT INTO product (Name, Description, Price, Quantity, Image) VALUES ('".concat(product.name, "', '").concat(product.description, "', '").concat(product.price, "', '").concat(product.quantity, "', '").concat(product.image, "')"));

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
    key: "update",
    value: function update(product, callback) {
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
                  return connection.query("UPDATE product SET Name = '".concat(product.name, "', Description = '").concat(product.description, "', Price = '").concat(product.price, "', Quantity = '").concat(product.quantity, "', Image = '").concat(product.image, "' WHERE ID = '").concat(product.ID, "'"));

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
    key: "delete",
    value: function _delete(productID, callback) {
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
                  return connection.query("DELETE FROM product WHERE ID = '".concat(productID, "' LIMIT 1"));

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
  }]);
  return ProductDAO;
}();

exports.ProductDAO = ProductDAO;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9Qcm9kdWN0REFPLnRzIl0sIm5hbWVzIjpbIlByb2R1Y3REQU8iLCJob3N0IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsInBvb2wiLCJteXNxbCIsImNyZWF0ZVBvb2wiLCJ1c2VyIiwiZGF0YWJhc2UiLCJjYWxsYmFjayIsInByb2R1Y3RzIiwiZ2V0Q29ubmVjdGlvbiIsImVyciIsImNvbm5lY3Rpb24iLCJxdWVyeSIsInJvd3MiLCJmaWVsZHMiLCJyZWxlYXNlIiwiaSIsImxlbmd0aCIsInB1c2giLCJQcm9kdWN0IiwiSUQiLCJOYW1lIiwiRGVzY3JpcHRpb24iLCJQcmljZSIsIlF1YW50aXR5IiwiSW1hZ2UiLCJ1dGlsIiwicHJvbWlzaWZ5IiwicmVzdWx0IiwicHJvZHVjdCIsIm5hbWUiLCJkZXNjIiwiZGVzY3JpcHRpb24iLCJwcmljZSIsInF1YW50aXR5IiwiaW1hZ2UiLCJhZmZlY3RlZFJvd3MiLCJwcm9kdWN0SUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOztBQUdBOztBQUdBOzs7Ozs7QUFQQTtBQUdBO0FBR0E7SUFHYUEsVTtBQU1ULHNCQUFZQyxJQUFaLEVBQTBCQyxRQUExQixFQUE0Q0MsUUFBNUMsRUFBOEQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQzFELFNBQUtGLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxJQUFMLEdBQVlDLEtBQUssQ0FBQ0MsVUFBTixDQUFpQjtBQUN6QkwsTUFBQUEsSUFBSSxFQUFFLEtBQUtBLElBRGM7QUFFekJNLE1BQUFBLElBQUksRUFBRSxLQUFLTCxRQUZjO0FBR3pCQyxNQUFBQSxRQUFRLEVBQUUsS0FBS0EsUUFIVTtBQUl6QkssTUFBQUEsUUFBUSxFQUFFO0FBSmUsS0FBakIsQ0FBWjtBQU1IOzs7O1dBRUQsd0JBQXNCQyxR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MkJBQThNTixPQUFPLENBQUNULEVBQXROLE9BTEM7O0FBQUE7QUFLaEJRLGtCQUFBQSxNQUxnQjs7QUFPcEIsc0JBQUlBLE1BQU0sQ0FBQ1EsWUFBUCxJQUF1QixDQUEzQixFQUE4QjtBQUMxQjdCLG9CQUFBQSxRQUFRLENBQUUsR0FBRixDQUFSO0FBQ0gsbUJBRkQsTUFFTztBQUNIQSxvQkFBQUEsUUFBUSxDQUFFLEdBQUYsQ0FBUjtBQUNIOztBQVhtQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUF4Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWFIOzs7V0FFRCxpQkFBYzhCLFNBQWQsRUFBaUM5QixRQUFqQyxFQUFnRDtBQUM1QztBQUNBLFdBQUtMLElBQUwsQ0FBVU8sYUFBVjtBQUFBLGtHQUF3QixrQkFBZ0JDLEdBQWhCLEVBQTBCQyxVQUExQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFaEJELEdBRmdCO0FBQUE7QUFBQTtBQUFBOztBQUFBLHdCQUVMQSxHQUZLOztBQUFBO0FBSXBCQyxrQkFBQUEsVUFBVSxDQUFDQyxLQUFYLEdBQW1CYyxJQUFJLENBQUNDLFNBQUwsQ0FBZWhCLFVBQVUsQ0FBQ0MsS0FBMUIsQ0FBbkI7QUFKb0I7QUFBQSx5QkFLREQsVUFBVSxDQUFDQyxLQUFYLDJDQUFvRHlCLFNBQXBELGVBTEM7O0FBQUE7QUFLaEJULGtCQUFBQSxNQUxnQjs7QUFPcEIsc0JBQUlBLE1BQU0sQ0FBQ1EsWUFBUCxJQUF1QixDQUEzQixFQUE4QjtBQUMxQjdCLG9CQUFBQSxRQUFRLENBQUUsR0FBRixDQUFSO0FBQ0gsbUJBRkQsTUFFTztBQUNIQSxvQkFBQUEsUUFBUSxDQUFFLEdBQUYsQ0FBUjtBQUNIOztBQVhtQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUF4Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWFIIiwic291cmNlc0NvbnRlbnQiOlsiLy8gT2JqZWN0IE1vZGVsIERlcGVuZGVuY2llc1xuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuLi9tb2RlbHMvUHJvZHVjdFwiO1xuXG4vLyBNeVNRTCBNb2R1bGUgRGVwZW5kZW5jeVxuaW1wb3J0ICogYXMgbXlzcWwgZnJvbSBcIm15c3FsXCI7XG5cbi8vIFV0aWwgTW9kdWxlIERlcGVuZGVuY3lcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSBcInV0aWxcIlxuXG5leHBvcnQgY2xhc3MgUHJvZHVjdERBTyB7XG4gICAgcHJpdmF0ZSBob3N0OiBzdHJpbmc7XG4gICAgcHJpdmF0ZSB1c2VybmFtZTogc3RyaW5nO1xuICAgIHByaXZhdGUgcGFzc3dvcmQ6IHN0cmluZztcbiAgICBwcml2YXRlIHBvb2w6IG15c3FsLlBvb2w7XG5cbiAgICBjb25zdHJ1Y3Rvcihob3N0OiBzdHJpbmcsIHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5ob3N0ID0gaG9zdDtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgICAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgICAgIHRoaXMucG9vbCA9IG15c3FsLmNyZWF0ZVBvb2woe1xuICAgICAgICAgICAgaG9zdDogdGhpcy5ob3N0LFxuICAgICAgICAgICAgdXNlcjogdGhpcy51c2VybmFtZSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLFxuICAgICAgICAgICAgZGF0YWJhc2U6ICdmMjFvM2Q1MnQ2d3RoYjR1J1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWxsUHJvZHVjdHMoY2FsbGJhY2s6IGFueSkge1xuICAgICAgICAvLyBMaXN0IG9mIFVzZXJzIHRvIHJldHVyblxuICAgICAgICBsZXQgcHJvZHVjdHM6IFByb2R1Y3RbXSA9IFtdO1xuXG4gICAgICAgIC8vIEdldCBhIHBvb2xlZCBjb25uZWN0aW9uIHRvIHRoZSBkYXRhYmFzZVxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihmdW5jdGlvbiAoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkge1xuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgZXhpc3RzXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gcnVuIHF1ZXJ5XG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIHByb2R1Y3QnLCBmdW5jdGlvbiAoZXJyOiBhbnksIHJvd3M6IGFueSwgZmllbGRzOiBhbnkpIHtcbiAgICAgICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcblxuICAgICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGV4aXN0c1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxuXG4gICAgICAgICAgICAgICAgLy8gTG9vcCBvdmVyIHJlc2lsdHMgYW5kIHBvcHVsYXRlIHJldHVybiBhcnJheVxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0cy5wdXNoKG5ldyBQcm9kdWN0KHJvd3NbaV0uSUQsIHJvd3NbaV0uTmFtZSwgcm93c1tpXS5EZXNjcmlwdGlvbiwgcm93c1tpXS5QcmljZSwgcm93c1tpXS5RdWFudGl0eSwgcm93c1tpXS5JbWFnZSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHJlc3VsdHNcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhwcm9kdWN0cyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFByb2R1Y3RCeUlEKElEOiBOdW1iZXIsIGNhbGxiYWNrOiBhbnkpIHtcbiAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uIChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSB7XG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBleGlzdHNcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxuXG5cbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIHByb2R1Y3QgV0hFUkUgSUQgPSA/JywgW0lEXSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBwcm9kdWN0ID0gbmV3IFByb2R1Y3QocmVzdWx0WzBdLklELCByZXN1bHRbMF0uTmFtZSwgcmVzdWx0WzBdLkRlc2NyaXB0aW9uLCByZXN1bHRbMF0uUHJpY2UsIHJlc3VsdFswXS5RdWFudGl0eSwgcmVzdWx0WzBdLkltYWdlKTtcblxuICAgICAgICAgICAgY2FsbGJhY2socHJvZHVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZWFyY2hCeU5hbWUobmFtZTogc3RyaW5nLCBjYWxsYmFjazogYW55KSB7XG4gICAgICAgIGxldCBwcm9kdWN0czogUHJvZHVjdFtdID0gW107XG5cbiAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uIChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSB7XG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBleGlzdHNcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxuXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSBwcm9kdWN0IFdIRVJFIE5hbWUgTElLRSA/JywgW25hbWVdKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0cy5wdXNoKG5ldyBQcm9kdWN0KHJlc3VsdFtpXS5JRCwgcmVzdWx0W2ldLk5hbWUsIHJlc3VsdFtpXS5EZXNjcmlwdGlvbiwgcmVzdWx0W2ldLlByaWNlLCByZXN1bHRbaV0uUXVhbnRpdHksIHJlc3VsdFtpXS5JbWFnZSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYWxsYmFjayhwcm9kdWN0cyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZWFyY2hCeURlc2MoZGVzYzogc3RyaW5nLCBjYWxsYmFjazogYW55KSB7XG4gICAgICAgIGxldCBwcm9kdWN0czogUHJvZHVjdFtdID0gW107XG5cbiAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uIChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSB7XG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBleGlzdHNcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxuXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSBwcm9kdWN0IFdIRVJFIERlc2NyaXB0aW9uIExJS0UgPycsIFtkZXNjXSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcHJvZHVjdHMucHVzaChuZXcgUHJvZHVjdChyZXN1bHRbaV0uSUQsIHJlc3VsdFtpXS5OYW1lLCByZXN1bHRbaV0uRGVzY3JpcHRpb24sIHJlc3VsdFtpXS5QcmljZSwgcmVzdWx0W2ldLlF1YW50aXR5LCByZXN1bHRbaV0uSW1hZ2UpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FsbGJhY2socHJvZHVjdHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlKHByb2R1Y3Q6IFByb2R1Y3QsIGNhbGxiYWNrOiBhbnkpIHtcbiAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uIChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSB7XG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBleGlzdHNcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxuXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShgSU5TRVJUIElOVE8gcHJvZHVjdCAoTmFtZSwgRGVzY3JpcHRpb24sIFByaWNlLCBRdWFudGl0eSwgSW1hZ2UpIFZBTFVFUyAoJyR7cHJvZHVjdC5uYW1lfScsICcke3Byb2R1Y3QuZGVzY3JpcHRpb259JywgJyR7cHJvZHVjdC5wcmljZX0nLCAnJHtwcm9kdWN0LnF1YW50aXR5fScsICcke3Byb2R1Y3QuaW1hZ2V9JylgKTtcblxuICAgICAgICAgICAgaWYgKHJlc3VsdC5hZmZlY3RlZFJvd3MgPT0gMSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrICgyMDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAoNTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZShwcm9kdWN0OiBQcm9kdWN0LCBjYWxsYmFjazogYW55KSB7XG4gICAgICAgIC8vIEdldCBhIHBvb2xlZCBjb25uZWN0aW9uIHRvIHRoZSBkYXRhYmFzZVxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbiAoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkge1xuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgZXhpc3RzXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcblxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoYFVQREFURSBwcm9kdWN0IFNFVCBOYW1lID0gJyR7cHJvZHVjdC5uYW1lfScsIERlc2NyaXB0aW9uID0gJyR7cHJvZHVjdC5kZXNjcmlwdGlvbn0nLCBQcmljZSA9ICcke3Byb2R1Y3QucHJpY2V9JywgUXVhbnRpdHkgPSAnJHtwcm9kdWN0LnF1YW50aXR5fScsIEltYWdlID0gJyR7cHJvZHVjdC5pbWFnZX0nIFdIRVJFIElEID0gJyR7cHJvZHVjdC5JRH0nYCk7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQuYWZmZWN0ZWRSb3dzID09IDEpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAoMjAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgKDUwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGUocHJvZHVjdElEOiBOdW1iZXIsIGNhbGxiYWNrOiBhbnkpIHtcbiAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uIChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSB7XG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBleGlzdHNcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxuXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShgREVMRVRFIEZST00gcHJvZHVjdCBXSEVSRSBJRCA9ICcke3Byb2R1Y3RJRH0nIExJTUlUIDFgKTtcblxuICAgICAgICAgICAgaWYgKHJlc3VsdC5hZmZlY3RlZFJvd3MgPT0gMSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrICgyMDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAoNTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==