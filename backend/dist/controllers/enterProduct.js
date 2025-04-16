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
const enterProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productDetails = req.body;
    //check wether the category is available or not 
    let categoryId = yield prisma.category.findFirst({
        where: {
            name: productDetails.category
        }
    });
    if (!categoryId) {
        categoryId = yield prisma.category.create({
            data: {
                name: productDetails.category
            }
        });
    }
    //check wether the product details are available or not
    let productId = yield prisma.product.findFirst({
        where: {
            name: productDetails.name
        }
    });
    if (!productId) {
        productId = yield prisma.product.create({
            data: {
                name: productDetails.name,
                measurment: productDetails.measurment,
                categoryId: categoryId.id
            }
        });
    }
    //enter the isntance of the product that user entered
    const productinstance = yield prisma.productInstance.create({
        data: {
            storage_location: productDetails.storage_location,
            quantity: productDetails.quantity,
            expiry_date: productDetails.expiry_date,
            productId: productId.id,
            accountId: productDetails.account_id,
            userId: productDetails.user_id
        }
    });
    console.log(productinstance);
    res.json(productinstance);
});
exports.default = enterProduct;
