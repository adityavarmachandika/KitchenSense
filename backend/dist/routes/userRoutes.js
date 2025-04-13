"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signInAuth_1 = __importDefault(require("../controllers/signInAuth"));
const router = express_1.default.Router();
router.post('/signIn', signInAuth_1.default);
exports.default = router;
