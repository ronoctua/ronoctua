"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBarChart = void 0;
var generateBarChart = function (_a) {
    var percent = _a.percent, _b = _a.barSize, barSize = _b === void 0 ? 12 : _b;
    var fraction = Math.floor((barSize * 8 * percent) / 100);
    var barsFull = Math.floor(fraction / 8);
    var semi = fraction % 8;
    var syms = '░████████';
    // const syms = "░▏▎▍▌▋▊▉█";
    if (barsFull >= barSize) {
        return syms.substring(8, 9).repeat(barSize);
    }
    return [syms.substring(8, 9).repeat(barsFull), syms.substring(semi, semi + 1)]
        .join('')
        .padEnd(barSize, syms.substring(0, 1));
};
exports.generateBarChart = generateBarChart;
