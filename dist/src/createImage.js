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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnimation = exports.createImage = void 0;
require("dotenv/config");
var imagemagick_1 = __importDefault(require("imagemagick"));
var config_json_1 = require("@config/config.json");
var error_1 = require("./error");
var workspacePath = process.env.WORKSPACE_PATH;
var widthSize = config_json_1.images.width, heightSize = config_json_1.images.height, font = config_json_1.images.fontFamily, color = config_json_1.images.textColor, background = config_json_1.images.backgroundColor, delay = config_json_1.images.gifDelay, extent = config_json_1.images.gifExtent, imageExtension = config_json_1.images.extension, animationExtension = config_json_1.images.animationExtension;
var createImage = function (_a) {
    var _b = _a.path, path = _b === void 0 ? workspacePath + "/assets/images" : _b, _c = _a.width, width = _c === void 0 ? widthSize : _c, _d = _a.height, height = _d === void 0 ? heightSize : _d, _e = _a.fontFamily, fontFamily = _e === void 0 ? font : _e, _f = _a.fontSize, fontSize = _f === void 0 ? '12' : _f, _g = _a.alignContent, alignContent = _g === void 0 ? 'east' : _g, _h = _a.textColor, textColor = _h === void 0 ? color : _h, _j = _a.backgroundColor, backgroundColor = _j === void 0 ? background : _j, filename = _a.filename, content = _a.content;
    return __awaiter(void 0, void 0, void 0, function () {
        var contentData;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0: return [4 /*yield*/, content];
                case 1:
                    contentData = _k.sent();
                    if (typeof contentData !== 'string' || contentData === '') {
                        (0, error_1.handleError)({ message: ">>> " + filename + " data was not received!" });
                        return [2 /*return*/];
                    }
                    imagemagick_1.default.convert([
                        '-size',
                        width + "x" + height,
                        '-background',
                        "" + backgroundColor,
                        '-fill',
                        "" + textColor,
                        '-font',
                        "" + fontFamily,
                        '-pointsize',
                        "" + fontSize,
                        '-gravity',
                        "" + alignContent,
                        "pango:" + contentData,
                        path + "/" + filename + "." + imageExtension,
                    ], function (error) { return error && (0, error_1.handleError)({ message: error }); });
                    return [2 /*return*/];
            }
        });
    });
};
exports.createImage = createImage;
var createAnimation = function (_a) {
    var _b = _a.path, path = _b === void 0 ? workspacePath + "/assets/images" : _b, _c = _a.gifDelay, gifDelay = _c === void 0 ? delay : _c, _d = _a.gifExtent, gifExtent = _d === void 0 ? extent : _d, filename = _a.filename;
    imagemagick_1.default.convert([
        '-delay',
        "" + gifDelay,
        '-loop',
        '0',
        '-gravity',
        'center',
        '-extent',
        "" + gifExtent,
        path + "/*." + imageExtension,
        path + "/" + filename + "." + animationExtension,
    ], function (error) { return error && (0, error_1.handleError)({ message: error }); });
};
exports.createAnimation = createAnimation;
