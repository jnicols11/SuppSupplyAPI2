"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9Qcm9kdWN0REFPLnRzIl0sIm5hbWVzIjpbIlByb2R1Y3REQU8iLCJob3N0IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsInBvb2wiLCJteXNxbCIsImNyZWF0ZVBvb2wiLCJ1c2VyIiwiZGF0YWJhc2UiLCJjYWxsYmFjayIsInByb2R1Y3RzIiwiZ2V0Q29ubmVjdGlvbiIsImVyciIsImNvbm5lY3Rpb24iLCJxdWVyeSIsInJvd3MiLCJmaWVsZHMiLCJyZWxlYXNlIiwiaSIsImxlbmd0aCIsInB1c2giLCJQcm9kdWN0IiwiSUQiLCJOYW1lIiwiRGVzY3JpcHRpb24iLCJQcmljZSIsIlF1YW50aXR5IiwiSW1hZ2UiLCJ1dGlsIiwicHJvbWlzaWZ5IiwicmVzdWx0IiwicHJvZHVjdCIsIm5hbWUiLCJkZXNjIiwiZGVzY3JpcHRpb24iLCJwcmljZSIsInF1YW50aXR5IiwiaW1hZ2UiLCJhZmZlY3RlZFJvd3MiLCJwcm9kdWN0SUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOztBQUdBOztBQUdBOztBQVBBO0FBR0E7QUFHQTtJQUdhQSxVO0FBTVQsc0JBQVlDLElBQVosRUFBMEJDLFFBQTFCLEVBQTRDQyxRQUE1QyxFQUE4RDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDMUQsU0FBS0YsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtDLElBQUwsR0FBWUMsS0FBSyxDQUFDQyxVQUFOLENBQWlCO0FBQ3pCTCxNQUFBQSxJQUFJLEVBQUUsS0FBS0EsSUFEYztBQUV6Qk0sTUFBQUEsSUFBSSxFQUFFLEtBQUtMLFFBRmM7QUFHekJDLE1BQUFBLFFBQVEsRUFBRSxLQUFLQSxRQUhVO0FBSXpCSyxNQUFBQSxRQUFRLEVBQUU7QUFKZSxLQUFqQixDQUFaO0FBTUg7Ozs7V0FFRCx3QkFBc0JDLFFBQXRC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OE1OLE9BQU8sQ0FBQ1QsRUFBdE4sT0FMQzs7QUFBQTtBQUtoQlEsa0JBQUFBLE1BTGdCOztBQU9wQixzQkFBSUEsTUFBTSxDQUFDUSxZQUFQLElBQXVCLENBQTNCLEVBQThCO0FBQzFCN0Isb0JBQUFBLFFBQVEsQ0FBRSxHQUFGLENBQVI7QUFDSCxtQkFGRCxNQUVPO0FBQ0hBLG9CQUFBQSxRQUFRLENBQUUsR0FBRixDQUFSO0FBQ0g7O0FBWG1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQXhCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBYUg7OztXQUVELGlCQUFjOEIsU0FBZCxFQUFpQzlCLFFBQWpDLEVBQWdEO0FBQzVDO0FBQ0EsV0FBS0wsSUFBTCxDQUFVTyxhQUFWO0FBQUEsa0dBQXdCLGtCQUFnQkMsR0FBaEIsRUFBMEJDLFVBQTFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUVoQkQsR0FGZ0I7QUFBQTtBQUFBO0FBQUE7O0FBQUEsd0JBRUxBLEdBRks7O0FBQUE7QUFJcEJDLGtCQUFBQSxVQUFVLENBQUNDLEtBQVgsR0FBbUJjLElBQUksQ0FBQ0MsU0FBTCxDQUFlaEIsVUFBVSxDQUFDQyxLQUExQixDQUFuQjtBQUpvQjtBQUFBLHlCQUtERCxVQUFVLENBQUNDLEtBQVgsMkNBQW9EeUIsU0FBcEQsZUFMQzs7QUFBQTtBQUtoQlQsa0JBQUFBLE1BTGdCOztBQU9wQixzQkFBSUEsTUFBTSxDQUFDUSxZQUFQLElBQXVCLENBQTNCLEVBQThCO0FBQzFCN0Isb0JBQUFBLFFBQVEsQ0FBRSxHQUFGLENBQVI7QUFDSCxtQkFGRCxNQUVPO0FBQ0hBLG9CQUFBQSxRQUFRLENBQUUsR0FBRixDQUFSO0FBQ0g7O0FBWG1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQXhCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBYUgiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBPYmplY3QgTW9kZWwgRGVwZW5kZW5jaWVzXHJcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi4vbW9kZWxzL1Byb2R1Y3RcIjtcclxuXHJcbi8vIE15U1FMIE1vZHVsZSBEZXBlbmRlbmN5XHJcbmltcG9ydCAqIGFzIG15c3FsIGZyb20gXCJteXNxbFwiO1xyXG5cclxuLy8gVXRpbCBNb2R1bGUgRGVwZW5kZW5jeVxyXG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJ1dGlsXCJcclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9kdWN0REFPIHtcclxuICAgIHByaXZhdGUgaG9zdDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSB1c2VybmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBwYXNzd29yZDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBwb29sOiBteXNxbC5Qb29sO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGhvc3Q6IHN0cmluZywgdXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaG9zdCA9IGhvc3Q7XHJcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcclxuICAgICAgICB0aGlzLnBvb2wgPSBteXNxbC5jcmVhdGVQb29sKHtcclxuICAgICAgICAgICAgaG9zdDogdGhpcy5ob3N0LFxyXG4gICAgICAgICAgICB1c2VyOiB0aGlzLnVzZXJuYW1lLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCxcclxuICAgICAgICAgICAgZGF0YWJhc2U6ICdmMjFvM2Q1MnQ2d3RoYjR1J1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBbGxQcm9kdWN0cyhjYWxsYmFjazogYW55KSB7XHJcbiAgICAgICAgLy8gTGlzdCBvZiBVc2VycyB0byByZXR1cm5cclxuICAgICAgICBsZXQgcHJvZHVjdHM6IFByb2R1Y3RbXSA9IFtdO1xyXG5cclxuICAgICAgICAvLyBHZXQgYSBwb29sZWQgY29ubmVjdGlvbiB0byB0aGUgZGF0YWJhc2VcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihmdW5jdGlvbiAoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkge1xyXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBleGlzdHNcclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBydW4gcXVlcnlcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSBwcm9kdWN0JywgZnVuY3Rpb24gKGVycjogYW55LCByb3dzOiBhbnksIGZpZWxkczogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGV4aXN0c1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTG9vcCBvdmVyIHJlc2lsdHMgYW5kIHBvcHVsYXRlIHJldHVybiBhcnJheVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdHMucHVzaChuZXcgUHJvZHVjdChyb3dzW2ldLklELCByb3dzW2ldLk5hbWUsIHJvd3NbaV0uRGVzY3JpcHRpb24sIHJvd3NbaV0uUHJpY2UsIHJvd3NbaV0uUXVhbnRpdHksIHJvd3NbaV0uSW1hZ2UpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiByZXN1bHRzXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhwcm9kdWN0cyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQcm9kdWN0QnlJRChJRDogTnVtYmVyLCBjYWxsYmFjazogYW55KSB7XHJcbiAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlXHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24gKGVycjogYW55LCBjb25uZWN0aW9uOiBhbnkpIHtcclxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgZXhpc3RzXHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxyXG5cclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gcHJvZHVjdCBXSEVSRSBJRCA9ID8nLCBbSURdKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBwcm9kdWN0ID0gbmV3IFByb2R1Y3QocmVzdWx0WzBdLklELCByZXN1bHRbMF0uTmFtZSwgcmVzdWx0WzBdLkRlc2NyaXB0aW9uLCByZXN1bHRbMF0uUHJpY2UsIHJlc3VsdFswXS5RdWFudGl0eSwgcmVzdWx0WzBdLkltYWdlKTtcclxuXHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHByb2R1Y3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZWFyY2hCeU5hbWUobmFtZTogc3RyaW5nLCBjYWxsYmFjazogYW55KSB7XHJcbiAgICAgICAgbGV0IHByb2R1Y3RzOiBQcm9kdWN0W10gPSBbXTtcclxuXHJcbiAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlXHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24gKGVycjogYW55LCBjb25uZWN0aW9uOiBhbnkpIHtcclxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgZXhpc3RzXHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSBwcm9kdWN0IFdIRVJFIE5hbWUgTElLRSA/JywgW25hbWVdKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0cy5wdXNoKG5ldyBQcm9kdWN0KHJlc3VsdFtpXS5JRCwgcmVzdWx0W2ldLk5hbWUsIHJlc3VsdFtpXS5EZXNjcmlwdGlvbiwgcmVzdWx0W2ldLlByaWNlLCByZXN1bHRbaV0uUXVhbnRpdHksIHJlc3VsdFtpXS5JbWFnZSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjYWxsYmFjayhwcm9kdWN0cyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlYXJjaEJ5RGVzYyhkZXNjOiBzdHJpbmcsIGNhbGxiYWNrOiBhbnkpIHtcclxuICAgICAgICBsZXQgcHJvZHVjdHM6IFByb2R1Y3RbXSA9IFtdO1xyXG5cclxuICAgICAgICAvLyBHZXQgYSBwb29sZWQgY29ubmVjdGlvbiB0byB0aGUgZGF0YWJhc2VcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbiAoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkge1xyXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBleGlzdHNcclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIHByb2R1Y3QgV0hFUkUgRGVzY3JpcHRpb24gTElLRSA/JywgW2Rlc2NdKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0cy5wdXNoKG5ldyBQcm9kdWN0KHJlc3VsdFtpXS5JRCwgcmVzdWx0W2ldLk5hbWUsIHJlc3VsdFtpXS5EZXNjcmlwdGlvbiwgcmVzdWx0W2ldLlByaWNlLCByZXN1bHRbaV0uUXVhbnRpdHksIHJlc3VsdFtpXS5JbWFnZSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjYWxsYmFjayhwcm9kdWN0cyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZShwcm9kdWN0OiBQcm9kdWN0LCBjYWxsYmFjazogYW55KSB7XHJcbiAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlXHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24gKGVycjogYW55LCBjb25uZWN0aW9uOiBhbnkpIHtcclxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgZXhpc3RzXHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShgSU5TRVJUIElOVE8gcHJvZHVjdCAoTmFtZSwgRGVzY3JpcHRpb24sIFByaWNlLCBRdWFudGl0eSwgSW1hZ2UpIFZBTFVFUyAoJyR7cHJvZHVjdC5uYW1lfScsICcke3Byb2R1Y3QuZGVzY3JpcHRpb259JywgJyR7cHJvZHVjdC5wcmljZX0nLCAnJHtwcm9kdWN0LnF1YW50aXR5fScsICcke3Byb2R1Y3QuaW1hZ2V9JylgKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuYWZmZWN0ZWRSb3dzID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrICgyMDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgKDUwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKHByb2R1Y3Q6IFByb2R1Y3QsIGNhbGxiYWNrOiBhbnkpIHtcclxuICAgICAgICAvLyBHZXQgYSBwb29sZWQgY29ubmVjdGlvbiB0byB0aGUgZGF0YWJhc2VcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbiAoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkge1xyXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBleGlzdHNcclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KGBVUERBVEUgcHJvZHVjdCBTRVQgTmFtZSA9ICcke3Byb2R1Y3QubmFtZX0nLCBEZXNjcmlwdGlvbiA9ICcke3Byb2R1Y3QuZGVzY3JpcHRpb259JywgUHJpY2UgPSAnJHtwcm9kdWN0LnByaWNlfScsIFF1YW50aXR5ID0gJyR7cHJvZHVjdC5xdWFudGl0eX0nLCBJbWFnZSA9ICcke3Byb2R1Y3QuaW1hZ2V9JyBXSEVSRSBJRCA9ICcke3Byb2R1Y3QuSUR9J2ApO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5hZmZlY3RlZFJvd3MgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgKDIwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAoNTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxldGUocHJvZHVjdElEOiBOdW1iZXIsIGNhbGxiYWNrOiBhbnkpIHtcclxuICAgICAgICAvLyBHZXQgYSBwb29sZWQgY29ubmVjdGlvbiB0byB0aGUgZGF0YWJhc2VcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbiAoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkge1xyXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBleGlzdHNcclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KGBERUxFVEUgRlJPTSBwcm9kdWN0IFdIRVJFIElEID0gJyR7cHJvZHVjdElEfScgTElNSVQgMWApO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5hZmZlY3RlZFJvd3MgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgKDIwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAoNTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19