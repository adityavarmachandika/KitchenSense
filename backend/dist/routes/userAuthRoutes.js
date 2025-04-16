"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signInAuth_1 = __importDefault(require("../controllers/signInAuth"));
const loginAuth_1 = __importDefault(require("../controllers/loginAuth"));
const enterProduct_1 = __importDefault(require("../controllers/enterProduct"));
const authware_1 = __importDefault(require("../middleware/authware"));
const deleteProductInstance_1 = __importDefault(require("../controllers/deleteProductInstance"));
const router = express_1.default.Router();
router.post('/signIn', signInAuth_1.default);
router.post('/logIn', loginAuth_1.default);
router.post("/product", authware_1.default, enterProduct_1.default);
router.delete("/product/delete", authware_1.default, deleteProductInstance_1.default);
exports.default = router;
