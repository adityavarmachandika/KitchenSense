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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const deleteProductInstance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const instanceId = parseInt(req.query.id);
    if (isNaN(instanceId))
        res.send("Id of the product instance is misssing");
    try {
        const isdeleted = yield prisma.productInstance.delete({
            where: {
                id: instanceId,
            }
        });
        res.json(isdeleted);
    }
    catch (error) {
        res.status(404).send("there is a error while deleting");
    }
});
exports.default = deleteProductInstance;
