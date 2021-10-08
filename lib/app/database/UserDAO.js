"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserDAO = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _User = require("../models/User");

var mysql = _interopRequireWildcard(require("mysql"));

var util = _interopRequireWildcard(require("util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Object Model Dependencies
// MySQL Module Dependency
// Util Module Dependency
var UserDAO = /*#__PURE__*/function () {
  function UserDAO(host, username, password) {
    (0, _classCallCheck2["default"])(this, UserDAO);
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

  (0, _createClass2["default"])(UserDAO, [{
    key: "getAllUsers",
    value: function getAllUsers(callback) {
      // List of Users to return
      var users = []; // Get a pooled connection to the database

      this.pool.getConnection(function (err, connection) {
        // Throw error if exists
        if (err) throw err; // run query

        connection.query('SELECT * FROM user', function (err, rows, fields) {
          // Release connection in the pool
          connection.release(); // Throw error if exists

          if (err) throw err; // Loop over resilts and populate return array

          for (var i = 0; i < rows.length; i++) {
            // TODO
            users.push(new _User.User(rows[i].ID, rows[i].FirstName, rows[i].LastName, rows[i].Email));
          } // Do a callback to return results


          callback(users);
        });
      });
    }
  }, {
    key: "getUserByID",
    value: function getUserByID(ID, callback) {
      // Get a pooled connection to the database
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, connection) {
          var result, user;
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
                  return connection.query('SELECT * FROM user WHERE ID = ?', [ID]);

                case 5:
                  result = _context.sent;
                  user = new _User.User(result[0].ID, result[0].FirstName, result[0].LastName, result[0].Email);
                  callback(user);

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
    key: "register",
    value: function register(user, callback) {
      // Get a pooled connection to the database
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err, connection) {
          var result;
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
                  return connection.query("INSERT INTO user (FirstName, LastName, Email, Password) VALUES ('".concat(user.firstName, "', '").concat(user.lastName, "', '").concat(user.email, "', '").concat(user.password, "')"));

                case 5:
                  result = _context2.sent;

                  if (result.affectedRows == 1) {
                    callback(200);
                  } else {
                    callback(500);
                  }

                case 7:
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
    key: "login",
    value: function login(email, password, callback) {
      // Get a pooled connection to the database
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(err, connection) {
          var result;
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
                  return connection.query('SELECT * FROM user WHERE Email = ? AND Password = ?', [email, password]);

                case 5:
                  result = _context3.sent;

                  if (result[0]) {
                    callback(200);
                  } else {
                    callback(401);
                  }

                case 7:
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
    key: "update",
    value: function update(user, callback) {
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
                  return connection.query("UPDATE user SET FirstName = '".concat(user.firstName, "', LastName = '").concat(user.lastName, "', Email = '").concat(user.email, "' WHERE ID = '").concat(user.ID, "'"));

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
    key: "delete",
    value: function _delete(id, callback) {
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
                  return connection.query("DELETE FROM user WHERE ID = '".concat(id, "' LIMIT 1"));

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
  }]);
  return UserDAO;
}();

exports.UserDAO = UserDAO;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9Vc2VyREFPLnRzIl0sIm5hbWVzIjpbIlVzZXJEQU8iLCJob3N0IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsInBvb2wiLCJteXNxbCIsImNyZWF0ZVBvb2wiLCJ1c2VyIiwiZGF0YWJhc2UiLCJjYWxsYmFjayIsInVzZXJzIiwiZ2V0Q29ubmVjdGlvbiIsImVyciIsImNvbm5lY3Rpb24iLCJxdWVyeSIsInJvd3MiLCJmaWVsZHMiLCJyZWxlYXNlIiwiaSIsImxlbmd0aCIsInB1c2giLCJVc2VyIiwiSUQiLCJGaXJzdE5hbWUiLCJMYXN0TmFtZSIsIkVtYWlsIiwidXRpbCIsInByb21pc2lmeSIsInJlc3VsdCIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwiZW1haWwiLCJhZmZlY3RlZFJvd3MiLCJpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBR0E7O0FBR0E7Ozs7OztBQVBBO0FBR0E7QUFHQTtJQUdhQSxPO0FBTVQsbUJBQVlDLElBQVosRUFBMEJDLFFBQTFCLEVBQTRDQyxRQUE1QyxFQUE4RDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDMUQsU0FBS0YsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtDLElBQUwsR0FBWUMsS0FBSyxDQUFDQyxVQUFOLENBQWlCO0FBQ3pCTCxNQUFBQSxJQUFJLEVBQUUsS0FBS0EsSUFEYztBQUV6Qk0sTUFBQUEsSUFBSSxFQUFFLEtBQUtMLFFBRmM7QUFHekJDLE1BQUFBLFFBQVEsRUFBRSxLQUFLQSxRQUhVO0FBSXpCSyxNQUFBQSxRQUFRLEVBQUU7QUFKZSxLQUFqQixDQUFaO0FBTUg7Ozs7V0FFRCxxQkFBbUJDLFFBQW5CLEVBQWtDO0FBQzlCO0FBQ0EsVUFBSUMsS0FBYSxHQUFHLEVBQXBCLENBRjhCLENBSTlCOztBQUNBLFdBQUtOLElB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QUFBLE1BTGdCOztBQU9wQixzQkFBSUEsTUFBTSxDQUFDSSxZQUFQLElBQXVCLENBQTNCLEVBQThCO0FBQzFCdkIsb0JBQUFBLFFBQVEsQ0FBRSxHQUFGLENBQVI7QUFDSCxtQkFGRCxNQUVPO0FBQ0hBLG9CQUFBQSxRQUFRLENBQUUsR0FBRixDQUFSO0FBQ0g7O0FBWG1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQXhCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBYUgiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBPYmplY3QgTW9kZWwgRGVwZW5kZW5jaWVzXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL21vZGVscy9Vc2VyXCI7XG5cbi8vIE15U1FMIE1vZHVsZSBEZXBlbmRlbmN5XG5pbXBvcnQgKiBhcyBteXNxbCBmcm9tIFwibXlzcWxcIjtcblxuLy8gVXRpbCBNb2R1bGUgRGVwZW5kZW5jeVxuaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwidXRpbFwiXG5cbmV4cG9ydCBjbGFzcyBVc2VyREFPIHtcbiAgICBwcml2YXRlIGhvc3Q6IHN0cmluZztcbiAgICBwcml2YXRlIHVzZXJuYW1lOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBwYXNzd29yZDogc3RyaW5nO1xuICAgIHByaXZhdGUgcG9vbDogbXlzcWwuUG9vbDtcblxuICAgIGNvbnN0cnVjdG9yKGhvc3Q6IHN0cmluZywgdXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcbiAgICAgICAgdGhpcy5wb29sID0gbXlzcWwuY3JlYXRlUG9vbCh7XG4gICAgICAgICAgICBob3N0OiB0aGlzLmhvc3QsXG4gICAgICAgICAgICB1c2VyOiB0aGlzLnVzZXJuYW1lLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsXG4gICAgICAgICAgICBkYXRhYmFzZTogJ2YyMW8zZDUydDZ3dGhiNHUnXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRBbGxVc2VycyhjYWxsYmFjazogYW55KSB7XG4gICAgICAgIC8vIExpc3Qgb2YgVXNlcnMgdG8gcmV0dXJuXG4gICAgICAgIGxldCB1c2VyczogVXNlcltdID0gW107XG5cbiAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGZ1bmN0aW9uIChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSB7XG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBleGlzdHNcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBydW4gcXVlcnlcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gdXNlcicsIGZ1bmN0aW9uIChlcnI6IGFueSwgcm93czogYW55LCBmaWVsZHM6IGFueSkge1xuICAgICAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgZXhpc3RzXG4gICAgICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXG5cbiAgICAgICAgICAgICAgICAvLyBMb29wIG92ZXIgcmVzaWx0cyBhbmQgcG9wdWxhdGUgcmV0dXJuIGFycmF5XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgICAgICAgdXNlcnMucHVzaChuZXcgVXNlcihyb3dzW2ldLklELCByb3dzW2ldLkZpcnN0TmFtZSwgcm93c1tpXS5MYXN0TmFtZSwgcm93c1tpXS5FbWFpbCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHJlc3VsdHNcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh1c2Vycyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFVzZXJCeUlEKElEOiBOdW1iZXIsIGNhbGxiYWNrOiBhbnkpIHtcbiAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uIChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSB7XG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBleGlzdHNcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxuXG5cbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIHVzZXIgV0hFUkUgSUQgPSA/JywgW0lEXSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlcihyZXN1bHRbMF0uSUQsIHJlc3VsdFswXS5GaXJzdE5hbWUsIHJlc3VsdFswXS5MYXN0TmFtZSwgcmVzdWx0WzBdLkVtYWlsKTtcblxuICAgICAgICAgICAgY2FsbGJhY2sodXNlcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlcih1c2VyOiBVc2VyLCBjYWxsYmFjazogYW55KSB7XG4gICAgICAgIC8vIEdldCBhIHBvb2xlZCBjb25uZWN0aW9uIHRvIHRoZSBkYXRhYmFzZVxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbiAoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkge1xuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgZXhpc3RzXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcblxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoYElOU0VSVCBJTlRPIHVzZXIgKEZpcnN0TmFtZSwgTGFzdE5hbWUsIEVtYWlsLCBQYXNzd29yZCkgVkFMVUVTICgnJHt1c2VyLmZpcnN0TmFtZX0nLCAnJHt1c2VyLmxhc3ROYW1lfScsICcke3VzZXIuZW1haWx9JywgJyR7dXNlci5wYXNzd29yZH0nKWApO1xuXG4gICAgICAgICAgICBpZiAocmVzdWx0LmFmZmVjdGVkUm93cyA9PSAxKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgKDIwMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrICg1MDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9naW4oZW1haWw6IFN0cmluZywgcGFzc3dvcmQ6IFN0cmluZywgY2FsbGJhY2s6IGFueSkge1xuICAgICAgICAvLyBHZXQgYSBwb29sZWQgY29ubmVjdGlvbiB0byB0aGUgZGF0YWJhc2VcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24gKGVycjogYW55LCBjb25uZWN0aW9uOiBhbnkpIHtcbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGV4aXN0c1xuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXG5cbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIHVzZXIgV0hFUkUgRW1haWwgPSA/IEFORCBQYXNzd29yZCA9ID8nLCBbZW1haWwsIHBhc3N3b3JkXSk7XG4gICAgICAgICAgICBpZiAocmVzdWx0WzBdKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgKDIwMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrICg0MDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKHVzZXI6IFVzZXIsIGNhbGxiYWNrOiBhbnkpIHtcbiAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uIChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSB7XG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBleGlzdHNcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxuXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShgVVBEQVRFIHVzZXIgU0VUIEZpcnN0TmFtZSA9ICcke3VzZXIuZmlyc3ROYW1lfScsIExhc3ROYW1lID0gJyR7dXNlci5sYXN0TmFtZX0nLCBFbWFpbCA9ICcke3VzZXIuZW1haWx9JyBXSEVSRSBJRCA9ICcke3VzZXIuSUR9J2ApXG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQuYWZmZWN0ZWRSb3dzID09IDEpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAoMjAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgKDUwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGUoaWQ6IE51bWJlciwgY2FsbGJhY2s6IGFueSkge1xuICAgICAgICAvLyBHZXQgYSBwb29sZWQgY29ubmVjdGlvbiB0byB0aGUgZGF0YWJhc2VcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24gKGVycjogYW55LCBjb25uZWN0aW9uOiBhbnkpIHtcbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGV4aXN0c1xuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXG5cbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KGBERUxFVEUgRlJPTSB1c2VyIFdIRVJFIElEID0gJyR7aWR9JyBMSU1JVCAxYCk7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQuYWZmZWN0ZWRSb3dzID09IDEpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAoMjAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgKDUwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn0iXX0=