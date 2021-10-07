"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var User = function User(ID, firstName, lastName, email, password) {
  (0, _classCallCheck2["default"])(this, User);
  (0, _defineProperty2["default"])(this, "ID", void 0);
  (0, _defineProperty2["default"])(this, "firstName", void 0);
  (0, _defineProperty2["default"])(this, "lastName", void 0);
  (0, _defineProperty2["default"])(this, "email", void 0);
  (0, _defineProperty2["default"])(this, "password", void 0);
  this.ID = ID;
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.password = password;
};

exports.User = User;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvVXNlci50cyJdLCJuYW1lcyI6WyJVc2VyIiwiSUQiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsImVtYWlsIiwicGFzc3dvcmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFBYUEsSSxHQU9ULGNBQVlDLEVBQVosRUFBd0JDLFNBQXhCLEVBQTJDQyxRQUEzQyxFQUE2REMsS0FBN0QsRUFBNEVDLFFBQTVFLEVBQStGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQzNGLE9BQUtKLEVBQUwsR0FBVUEsRUFBVjtBQUNBLE9BQUtDLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsT0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxPQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxPQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNILEMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVXNlciB7XG4gICAgcHVibGljIElEOiBOdW1iZXI7XG4gICAgcHVibGljIGZpcnN0TmFtZTogU3RyaW5nO1xuICAgIHB1YmxpYyBsYXN0TmFtZTogU3RyaW5nO1xuICAgIHB1YmxpYyBlbWFpbDogU3RyaW5nO1xuICAgIHB1YmxpYyBwYXNzd29yZDogU3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IoSUQ6IE51bWJlciwgZmlyc3ROYW1lOiBTdHJpbmcsIGxhc3ROYW1lOiBTdHJpbmcsIGVtYWlsOiBTdHJpbmcsIHBhc3N3b3JkPzogU3RyaW5nKSB7XG4gICAgICAgIHRoaXMuSUQgPSBJRDtcbiAgICAgICAgdGhpcy5maXJzdE5hbWUgPSBmaXJzdE5hbWU7XG4gICAgICAgIHRoaXMubGFzdE5hbWUgPSBsYXN0TmFtZTtcbiAgICAgICAgdGhpcy5lbWFpbCA9IGVtYWlsO1xuICAgICAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgfVxufSJdfQ==