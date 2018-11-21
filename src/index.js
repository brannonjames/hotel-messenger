"use strict";
exports.__esModule = true;
var inquirer = require("inquirer");
var json_export_1 = require("./assets/json-export");
var Prompt_1 = require("./Models/Prompt");
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.start = function () {
        this.runInquirer();
    };
    App.prototype.runInquirer = function () {
        var _this = this;
        var company = this.getCompanyNames(json_export_1.companies);
        var hotelPrompt = new Prompt_1["default"]('list', 'hotel', 'What hotel do you work for?', company);
        var guestPrompt = new Prompt_1["default"]('input', 'guest', 'Guest Name or ID', null, function (input) {
            return _this.nameValidator(input, json_export_1.guests);
        });
        inquirer.
            prompt([
            hotelPrompt,
            guestPrompt
        ])
            .then(function (answer) {
            _this.currentHotel = _this.findHotel(answer.hotel, json_export_1.companies);
            _this.currentGuest = _this.findGuest(answer.guest, json_export_1.guests);
        })["catch"](function (error) {
            console.log('An Error has Occured');
        });
    };
    App.prototype.getCompanyNames = function (companies) {
        return companies.map(function (c) { return c.company; });
    };
    App.prototype.findHotel = function (input, companiesToCheck) {
        return companiesToCheck.find(function (c) {
            var queryToLower = String(input.toLowerCase());
            if (c.company.toLowerCase() === queryToLower) {
                return true;
            }
            return false;
        });
    };
    App.prototype.findGuest = function (input, guestsToCheck) {
        return guestsToCheck.find(function (g) {
            var queryToLower = String(input.toLowerCase());
            if (String(g.id).toLowerCase() === queryToLower) {
                return true;
            }
            if (g.firstName.toLowerCase() === queryToLower) {
                return true;
            }
            if (g.lastName.toLowerCase() === queryToLower) {
                return true;
            }
            return false;
        });
    };
    App.prototype.nameValidator = function (input, guestsToCheck) {
        var guest = this.findGuest(input, guestsToCheck);
        if (!guest) {
            console.log('\n Guest Not Found. Try Again.');
            return false;
        }
        return true;
    };
    return App;
}());
var app = new App();
app.start();
