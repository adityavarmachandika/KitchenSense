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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const logInAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phoneNumber, password } = req.body;
    const userDetails = yield prisma.user.findFirst({
        where: {
            phoneNumber,
            account: {
                email,
                password
            }
        },
        include: {
            account: true
        }
    });
    if (!userDetails) {
        return res.status(401).json({ "error": "user not found " });
    }
    const payload = {
        id: userDetails.id,
        phoneNumber: userDetails.phoneNumber
    };
    const jwt_secret = process.env.JWT_SECRET;
    if (!jwt_secret) {
        console.error("JWT_SECRET is undefined");
        return res.status(500).json({ error: "Internal server error" });
    }
    const jsonToken = jsonwebtoken_1.default.sign(payload, jwt_secret, { expiresIn: '1d' });
    return res.status(200).json({
        "name": userDetails.name,
        "accountId": userDetails.accountId,
        "role": userDetails.role,
        "userId": userDetails.id,
        "jwtToken": jsonToken
    });
});
exports.default = logInAuth;
