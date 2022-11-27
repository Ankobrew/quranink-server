"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const prisma_1 = require("../lib/prisma");
async function createContext({}) {
    return {
        prisma: prisma_1.prisma,
    };
}
exports.createContext = createContext;
//# sourceMappingURL=context.js.map