"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

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
                    callback(result[0]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9Vc2VyREFPLnRzIl0sIm5hbWVzIjpbIlVzZXJEQU8iLCJob3N0IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsInBvb2wiLCJteXNxbCIsImNyZWF0ZVBvb2wiLCJ1c2VyIiwiZGF0YWJhc2UiLCJjYWxsYmFjayIsInVzZXJzIiwiZ2V0Q29ubmVjdGlvbiIsImVyciIsImNvbm5lY3Rpb24iLCJxdWVyeSIsInJvd3MiLCJmaWVsZHMiLCJyZWxlYXNlIiwiaSIsImxlbmd0aCIsInB1c2giLCJVc2VyIiwiSUQiLCJGaXJzdE5hbWUiLCJMYXN0TmFtZSIsIkVtYWlsIiwidXRpbCIsInByb21pc2lmeSIsInJlc3VsdCIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwiZW1haWwiLCJhZmZlY3RlZFJvd3MiLCJpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBR0E7O0FBR0E7O0FBUEE7QUFHQTtBQUdBO0lBR2FBLE87QUFNVCxtQkFBWUMsSUFBWixFQUEwQkMsUUFBMUIsRUFBNENDLFFBQTVDLEVBQThEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUMxRCxTQUFLRixJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQyxLQUFLLENBQUNDLFVBQU4sQ0FBaUI7QUFDekJMLE1BQUFBLElBQUksRUFBRSxLQUFLQSxJQURjO0FBRXpCTSxNQUFBQSxJQUFJLEVBQUUsS0FBS0wsUUFGYztBQUd6QkMsTUFBQUEsUUFBUSxFQUFFLEtBQUtBLFFBSFU7QUFJekJLLE1BQUFBLFFBQVEsRUFBRTtBQUplLEtBQWpCLENBQVo7QUFNSDs7OztXQUVELHFCQUFtQkMsUUFBbkIsRUFBa0M7QUFDOUI7QUFDQSxVQUFJQyxLQUFhLEdBQUcsRUFBcEIsQ0FGOEIsQ0FJOUI7O0FBQ0EsV0FBS04sSUFBTCxD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WUFBUCxJQUF1QixDQUEzQixFQUE4QjtBQUMxQnZCLG9CQUFBQSxRQUFRLENBQUUsR0FBRixDQUFSO0FBQ0gsbUJBRkQsTUFFTztBQUNIQSxvQkFBQUEsUUFBUSxDQUFFLEdBQUYsQ0FBUjtBQUNIOztBQVhtQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUF4Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWFIIiwic291cmNlc0NvbnRlbnQiOlsiLy8gT2JqZWN0IE1vZGVsIERlcGVuZGVuY2llc1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL21vZGVscy9Vc2VyXCI7XHJcblxyXG4vLyBNeVNRTCBNb2R1bGUgRGVwZW5kZW5jeVxyXG5pbXBvcnQgKiBhcyBteXNxbCBmcm9tIFwibXlzcWxcIjtcclxuXHJcbi8vIFV0aWwgTW9kdWxlIERlcGVuZGVuY3lcclxuaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwidXRpbFwiXHJcblxyXG5leHBvcnQgY2xhc3MgVXNlckRBTyB7XHJcbiAgICBwcml2YXRlIGhvc3Q6IHN0cmluZztcclxuICAgIHByaXZhdGUgdXNlcm5hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgcGFzc3dvcmQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgcG9vbDogbXlzcWwuUG9vbDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihob3N0OiBzdHJpbmcsIHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xyXG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcclxuICAgICAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XHJcbiAgICAgICAgdGhpcy5wb29sID0gbXlzcWwuY3JlYXRlUG9vbCh7XHJcbiAgICAgICAgICAgIGhvc3Q6IHRoaXMuaG9zdCxcclxuICAgICAgICAgICAgdXNlcjogdGhpcy51c2VybmFtZSxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsXHJcbiAgICAgICAgICAgIGRhdGFiYXNlOiAnZjIxbzNkNTJ0Nnd0aGI0dSdcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QWxsVXNlcnMoY2FsbGJhY2s6IGFueSkge1xyXG4gICAgICAgIC8vIExpc3Qgb2YgVXNlcnMgdG8gcmV0dXJuXHJcbiAgICAgICAgbGV0IHVzZXJzOiBVc2VyW10gPSBbXTtcclxuXHJcbiAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlXHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oZnVuY3Rpb24gKGVycjogYW55LCBjb25uZWN0aW9uOiBhbnkpIHtcclxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgZXhpc3RzXHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gcnVuIHF1ZXJ5XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gdXNlcicsIGZ1bmN0aW9uIChlcnI6IGFueSwgcm93czogYW55LCBmaWVsZHM6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBleGlzdHNcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxyXG5cclxuICAgICAgICAgICAgICAgIC8vIExvb3Agb3ZlciByZXNpbHRzIGFuZCBwb3B1bGF0ZSByZXR1cm4gYXJyYXlcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE9cclxuICAgICAgICAgICAgICAgICAgICB1c2Vycy5wdXNoKG5ldyBVc2VyKHJvd3NbaV0uSUQsIHJvd3NbaV0uRmlyc3ROYW1lLCByb3dzW2ldLkxhc3ROYW1lLCByb3dzW2ldLkVtYWlsKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gcmVzdWx0c1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodXNlcnMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VXNlckJ5SUQoSUQ6IE51bWJlciwgY2FsbGJhY2s6IGFueSkge1xyXG4gICAgICAgIC8vIEdldCBhIHBvb2xlZCBjb25uZWN0aW9uIHRvIHRoZSBkYXRhYmFzZVxyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uIChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSB7XHJcbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGV4aXN0c1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcclxuXHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIHVzZXIgV0hFUkUgSUQgPSA/JywgW0lEXSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCB1c2VyID0gbmV3IFVzZXIocmVzdWx0WzBdLklELCByZXN1bHRbMF0uRmlyc3ROYW1lLCByZXN1bHRbMF0uTGFzdE5hbWUsIHJlc3VsdFswXS5FbWFpbCk7XHJcblxyXG4gICAgICAgICAgICBjYWxsYmFjayh1c2VyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVnaXN0ZXIodXNlcjogVXNlciwgY2FsbGJhY2s6IGFueSkge1xyXG4gICAgICAgIC8vIEdldCBhIHBvb2xlZCBjb25uZWN0aW9uIHRvIHRoZSBkYXRhYmFzZVxyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uIChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSB7XHJcbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGV4aXN0c1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoYElOU0VSVCBJTlRPIHVzZXIgKEZpcnN0TmFtZSwgTGFzdE5hbWUsIEVtYWlsLCBQYXNzd29yZCkgVkFMVUVTICgnJHt1c2VyLmZpcnN0TmFtZX0nLCAnJHt1c2VyLmxhc3ROYW1lfScsICcke3VzZXIuZW1haWx9JywgJyR7dXNlci5wYXNzd29yZH0nKWApO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5hZmZlY3RlZFJvd3MgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgKDIwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAoNTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dpbihlbWFpbDogU3RyaW5nLCBwYXNzd29yZDogU3RyaW5nLCBjYWxsYmFjazogYW55KSB7XHJcbiAgICAgICAgLy8gR2V0IGEgcG9vbGVkIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlXHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24gKGVycjogYW55LCBjb25uZWN0aW9uOiBhbnkpIHtcclxuICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgZXhpc3RzXHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSB1c2VyIFdIRVJFIEVtYWlsID0gPyBBTkQgUGFzc3dvcmQgPSA/JywgW2VtYWlsLCBwYXNzd29yZF0pO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0WzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAocmVzdWx0WzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUodXNlcjogVXNlciwgY2FsbGJhY2s6IGFueSkge1xyXG4gICAgICAgIC8vIEdldCBhIHBvb2xlZCBjb25uZWN0aW9uIHRvIHRoZSBkYXRhYmFzZVxyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uIChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSB7XHJcbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGV4aXN0c1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoYFVQREFURSB1c2VyIFNFVCBGaXJzdE5hbWUgPSAnJHt1c2VyLmZpcnN0TmFtZX0nLCBMYXN0TmFtZSA9ICcke3VzZXIubGFzdE5hbWV9JywgRW1haWwgPSAnJHt1c2VyLmVtYWlsfScgV0hFUkUgSUQgPSAnJHt1c2VyLklEfSdgKVxyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5hZmZlY3RlZFJvd3MgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgKDIwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAoNTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxldGUoaWQ6IE51bWJlciwgY2FsbGJhY2s6IGFueSkge1xyXG4gICAgICAgIC8vIEdldCBhIHBvb2xlZCBjb25uZWN0aW9uIHRvIHRoZSBkYXRhYmFzZVxyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uIChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSB7XHJcbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGV4aXN0c1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoYERFTEVURSBGUk9NIHVzZXIgV0hFUkUgSUQgPSAnJHtpZH0nIExJTUlUIDFgKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuYWZmZWN0ZWRSb3dzID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrICgyMDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgKDUwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdfQ==