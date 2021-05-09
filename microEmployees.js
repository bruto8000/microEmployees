const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const cors = require('cors')



const mysql = require("mysql");

let db_config = require('./connection.js');
let searchColumns = [
  { name: "winlogin", operator: "=" },
  { name: "personnelNumber", operator: "=" },
  { name: "fullName", operator: "LIKE" },
];

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config);

  connection.connect(function (err) {
    if (err) {
      setTimeout(handleDisconnect, 2000);
    }else{
      console.log('connected to database')
    }
  });

  connection.on("error", function (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
handleDisconnect();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

app.all("*", (req, res, next) => {
  console.log(`request URL : ${req.url} //\\\\ METHOD IS ${req.method}`);

  next();
});

function validateReq(req, res, next) {
  if(!Object.keys(req.body).length && Object.keys(req.query).length){
    req.body = req.query;
  }

  if (!searchColumns.map((column) => column.name).includes(req.body.searchBy)) {
    res.status(400).end("BAD REQUEST");
    return;
  }

  next();
}
function modifyOperatorAndParameter(req, res, next) {
  if (
    !req.body.limit ||
    isNaN(Number(req.body.limit)) ||
    (!isNaN(Number(req.body.limit)) &&
      (req.body.limit > 20 || req.body.limit < 1))
  ) {
    req.body.limit = 20;
  }

  req.body.operator = searchColumns.find(
    (column) => column.name == req.body.searchBy
  ).operator;

  

  if (req.body.operator == "LIKE") {
    req.body.parameter = `%${req.body.parameter}%`;
  }

  next();
}
app.get("/employees", validateReq, modifyOperatorAndParameter, (req, res) => {
  let sql = `SELECT * FROM EMPLOYEES WHERE ${req.body.searchBy} ${req.body.operator} '${req.body.parameter}' LIMIT ${req.body.limit}`;
  console.log(sql);
  executeQuery(sql)
    .then((results) => {
      res.end(JSON.stringify(results));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end(JSON.stringify(err));
    });
});

app.all("*", (req, res) => {
  res.status(404).end("NOT FOUND");
});

function executeQuery(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, function (error, result, field) {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}

app.listen(3001, console.log("СЕРВЕР РАБОТАЕТ НА ПОРТУ : 3001"));
