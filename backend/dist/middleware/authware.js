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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    const authheader = req.headers.authorization;
    if (authheader && authheader.startsWith('Bearer')) {
        try {
            token = authheader.split(' ')[1];
            const verify = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            console.log("the token is verifed");
            next();
        }
        catch (err) {
            console.log(err);
            res.status(401).json({ "error": " not authorized" });
        }
    }
    else {
        res.status(404).json({ "error": "login first" });
        return;
    }
});
exports.default = protect;
