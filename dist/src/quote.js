"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomQuote = void 0;
var config_json_1 = require("@config/config.json");
var quotes_json_1 = require("@data/quotes.json");
var randomQuote = function (_a) {
    var _b = _a.quotesData, quotesData = _b === void 0 ? quotes_json_1.quotes : _b;
    var primaryColor = config_json_1.images.primaryColor;
    var randomQuote = quotesData[Math.floor(Math.random() * quotes_json_1.quotes.length)];
    var author = randomQuote[0];
    var quote = randomQuote[1];
    return "\n<span color=\"" + primaryColor + "\"><b>Random Quote</b></span>\n\n<span rise=\"10000\"><small>\"<i>" + quote + "</i>\" <b>" + author + "</b></small></span>\n";
};
exports.randomQuote = randomQuote;
