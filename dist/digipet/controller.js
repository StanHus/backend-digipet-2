"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ignoreDigipet = exports.feedDigipet = exports.walkDigipet = exports.trainDigipet = exports.rehomeDigipet = exports.hatchDigipet = void 0;
const model_1 = require("./model");
/**
 * The actions that your Digipet game supports.
 *
 * These update the underlying digipet by using the functions defined in model.ts
 */
function hatchDigipet() {
    if (model_1.getDigipet()) {
        throw new Error("Can't hatch a digipet when you already have one!");
    }
    else {
        // spread to avoid accidental mutation
        const newDigipet = Object.assign({}, model_1.INITIAL_DIGIPET);
        model_1.setDigipet(newDigipet);
        return newDigipet;
    }
}
exports.hatchDigipet = hatchDigipet;
function rehomeDigipet() {
    if (model_1.getDigipet()) {
        // spread to avoid accidental mutation
        const noDigipet = undefined;
        model_1.setDigipet(noDigipet);
        return noDigipet;
    }
    else {
        throw new Error("Can't rehome a digipet when you don't have one!");
    }
}
exports.rehomeDigipet = rehomeDigipet;
function trainDigipet() {
    model_1.updateDigipetBounded("discipline", 10);
    model_1.updateDigipetBounded("happiness", -5);
}
exports.trainDigipet = trainDigipet;
function walkDigipet() {
    model_1.updateDigipetBounded("happiness", 10);
    model_1.updateDigipetBounded("nutrition", -5);
}
exports.walkDigipet = walkDigipet;
function feedDigipet() {
    model_1.updateDigipetBounded("nutrition", 10);
    model_1.updateDigipetBounded("discipline", -5);
}
exports.feedDigipet = feedDigipet;
function ignoreDigipet() {
    model_1.updateDigipetBounded("nutrition", -10);
    model_1.updateDigipetBounded("discipline", -10);
    model_1.updateDigipetBounded("happiness", -10);
}
exports.ignoreDigipet = ignoreDigipet;
