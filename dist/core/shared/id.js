"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Id {
    static gerarHash() {
        return (0, uuid_1.v4)();
    }
}
exports.default = Id;
