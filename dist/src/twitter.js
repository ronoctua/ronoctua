"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTwitterImage = void 0;
require("dotenv/config");
var twit_1 = __importDefault(require("twit"));
var config_json_1 = require("@config/config.json");
var createImage_1 = require("./createImage");
var error_1 = require("./error");
var _a = process.env, twitterApiKey = _a.TWITTER_API_KEY, twitterApiSecretKey = _a.TWITTER_API_SECRET_KEY, twitterAccessToken = _a.TWITTER_ACCESS_TOKEN, twitterAccessTokenSecret = _a.TWITTER_ACCESS_TOKEN_SECRET;
var twitterApi = new twit_1.default({
    consumer_key: twitterApiKey,
    consumer_secret: twitterApiSecretKey,
    access_token: twitterAccessToken,
    access_token_secret: twitterAccessTokenSecret,
});
var createTwitterImage = function (_a) {
    var accountName = _a.accountName, _b = _a.numberOfTweets, numberOfTweets = _b === void 0 ? 1 : _b, filename = _a.filename;
    twitterApi.get('statuses/user_timeline', { screen_name: accountName, count: numberOfTweets }, function (err, data) {
        if (err) {
            (0, error_1.handleError)({ message: ">>> Twitter API Error!\n" + err });
        }
        var primaryColor = config_json_1.images.primaryColor;
        var twitterData = data;
        var tweets = '';
        twitterData.forEach(function (tweet) {
            tweets += tweet.text + "\n";
        });
        var twitterContent = "\n<span color=\"" + primaryColor + "\"><b>" + (numberOfTweets === 1 ? 'Last tweet' : 'Last tweets') + "</b>  <small>  @" + accountName + "</small></span>\n\n<span rise=\"10000\"><small>" + tweets + "</small></span>\n      ";
        (0, createImage_1.createImage)({ filename: filename, content: twitterContent });
    });
};
exports.createTwitterImage = createTwitterImage;
