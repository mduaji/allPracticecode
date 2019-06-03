const express = require("express");
const app = express();
app.use(express.json());

const coursedtl = [{ id: 1, name: "java" }, { id: 2, name: "node" }, { id: 3, name: ".net" }, { id: 4, name: "sql" }];

module.exports = app.get('/api/courses', (req, res) => {
    res.json(coursedtl);
});

var port = process.env.PORT || 5000
app.listen(port, () => console.log(`the port listen ${port}...`));