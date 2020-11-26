import express from "express";
const fastcsv = require("fast-csv");
const fs = require("fs");
const app = express();
import { UsersInterface } from "./interfaces";
const CONSTANTS = require("./constants");
const neatCsv = require("neat-csv"); 

app.get("/", (req, res) => {
  res.status(200).json("Hello World!");
});

app.get("/generate_file", (req, res) => {
  let users: Array<UsersInterface> = [];
  const ws = fs.createWriteStream("users.csv");
  let i = CONSTANTS.ORIGINAL_VALUE;

  // creating an array of users
  while (i <= CONSTANTS.TOTAL_USERS) {
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
  fs.readFile("./users.csv", async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let users: Array<UsersInterface> = [];
    users = await neatCsv(data);
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
  });
});

app.listen(CONSTANTS.PORT);
