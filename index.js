"use strict";
exports.__esModule = true;
var Companies_json_1 = require("./assets/Companies.json");
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.start = function () {
        console.log(Companies_json_1["default"]);
        // const hotels = this.getCompanyNames(companies);
        // const hotelPrompt = new Prompt('list', 'hotels', 'What hotel do you work for?', hotels);
        // inquirer.
        // prompt([
        //   hotelPrompt
        // ])
        // .then(answers => {
        //   console.log(answers);
        // });
    };
    App.prototype.getCompanyNames = function (companies) {
        return companies.map(function (c) { return c.company; });
    };
    return App;
}());
var app = new App();
app.start();
