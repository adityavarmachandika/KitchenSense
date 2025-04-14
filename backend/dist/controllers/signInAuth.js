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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const signInAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jwt_secret = process.env.JWT_SECRET;
    if (!jwt_secret) {
        console.error("JWT_SECRET is undefined");
        return res.status(500).json({ error: "Internal server error" });
    }
    const { name, email, phoneNumber, password, role } = req.body;
    if (!name || !email || !phoneNumber || !password || !role) {
        return res.status(400).json({ "error": "missing feilds" });
    }
    const existaccount = yield prisma.account.findUnique({
        where: {
            email: email
        }
    });
    if (existaccount) {
        return res.status(409).json({ "error": "the email already exists" });
    }
    const existuser = yield prisma.user.findUnique({
        where: {
            phoneNumber: phoneNumber
        }
    });
    if (existuser) {
        return res.status(409).json({ "error": "the phone number already exists " });
    }
    const createAcc = yield prisma.account.create({
        data: {
            email,
            password
        }
    });
    const createUser = yield prisma.user.create({
        data: {
            name,
            phoneNumber,
            role,
            accountId: createAcc.id
        }
    });
    const payload = {
        id: createUser.id,
        phoneNumber: createUser.phoneNumber
    };
    const jwtToken = jsonwebtoken_1.default.sign(payload, jwt_secret, { expiresIn: "1d" });
    res.status(201).json({ createAcc, createUser, jwtToken });
});
exports.default = signInAuth;
