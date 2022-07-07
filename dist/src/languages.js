"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.languages = void 0;
require("dotenv/config");
// @ts-ignore
var wakatime_client_1 = require("wakatime-client");
var config_json_1 = require("@config/config.json");
var generateBarChart_1 = require("./generateBarChart");
var languages = function () { return __awaiter(void 0, void 0, void 0, function () {
    var primaryColor, secondaryTextColor, wakatimeApiKey, wakatime, response, languagesData, i, responseLanguageData, name_1, percent, barChart, formattedLanguage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                primaryColor = config_json_1.images.primaryColor, secondaryTextColor = config_json_1.images.secondaryTextColor;
                wakatimeApiKey = process.env.WAKATIME_API_KEY;
                wakatime = new wakatime_client_1.WakaTimeClient(wakatimeApiKey);
                return [4 /*yield*/, wakatime.getMyStats({ range: wakatime_client_1.RANGE.LAST_7_DAYS })];
            case 1:
                response = _a.sent();
                languagesData = [];
                for (i = 0; i < Math.min(response.data.languages.length, 5); i++) {
                    responseLanguageData = response.data.languages[i];
                    name_1 = responseLanguageData.name, percent = responseLanguageData.percent;
                    barChart = (0, generateBarChart_1.generateBarChart)({ percent: percent });
                    formattedLanguage = [
                        "<span><small>" + barChart + "  <small>" + name_1 + "   <span fgcolor=\"" + secondaryTextColor + "\">" + (String(percent.toFixed(1)) + "%") + "</span></small></small></span>\n",
                    ];
                    languagesData.push(formattedLanguage);
                }
                if (languagesData.length === 0) {
                    return [2 /*return*/, null]; // Returning null will keep old metrics.
                }
                return [2 /*return*/, "\n<span color=\"" + primaryColor + "\"><b>Most used languages</b> <small>(last days)</small></span>\n\n<span rise=\"-10000\">" + languagesData.join('') + "</span>\n  "];
        }
    });
}); };
exports.languages = languages;
