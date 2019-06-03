const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');
const users = require('./routes/server');
const data = require('./routes/user');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//app.set('secretKey', 'secret');

// app.get('/', function (req, res) {
//    res.json({ "tutorial": "Build REST API with node.js" });
// });

// public route
app.use('/data', data);

// private route
app.use('/users', validateUser, users);

// function validateUser(req, res, next) {

//    jwt.verify(req.headers['x-access-token'], 'secret', (err, decoded) => {
//       console.log(decoded);
//       if (err) {
//          res.json({ status: "error", message: err.message, data: null });
//       } else {
//          // add user id to request
//          req.body._id = decoded._id;
//          next();
//       }
//    });

// }
function validateUser  (req, res, next)  {
   try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, config.secret);
      req.employeeData = decoded;
      next();
   } catch (err) {
      return res.status(401).json({
         message: 'Auth failed'
      })
   }
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`the server listen ${port}......`));