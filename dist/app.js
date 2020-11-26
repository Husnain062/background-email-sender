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
const express_1 = __importDefault(require("express"));
const fastcsv = require("fast-csv");
const fs = require("fs");
const app = express_1.default();
const CONSTANTS = require("./constants");
const neatCsv = require("neat-csv");
app.get("/", (req, res) => {
    res.status(200).json("Hello World!");
});
app.get("/generate_file", (req, res) => {
    let users = [];
    const ws = fs.createWriteStream("users.csv");
    let i = CONSTANTS.ORIGINAL_VALUE;
    // creating an array of users
    while (i < CONSTANTS.TOTAL_USERS) {
        users.push({ id: i, message: CONSTANTS.MESSAGE_API_1 + i });
        i++;
    }
    // generating file of users
    fastcsv.write(users).pipe(ws);
    res
        .status(200)
        .json({ message: `file with users ${users.length} created sucessfully!` });
});
app.get("/greeting_email", (req, res) => {
    // read users file
    fs.readFile("./users.csv", (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error(err);
            return;
        }
        let users = [];
        users = yield neatCsv(data);
        console.log("Length of Array", users.length);
        users.forEach((user, index) => {
            // sending emails in background
            setTimeout(function () {
                console.log(`Email send to user ${index} sucessfully`);
            }, CONSTANTS.INTERVAL);
        });
        res
            .status(200)
            .json({ message: `Email sending process start sucessfully!` });
    }));
});
app.listen(CONSTANTS.PORT);
//# sourceMappingURL=app.js.map