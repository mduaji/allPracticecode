const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'pug');

app.set('views', path.join(__dirname,'./views'));

app.get('/', (req, res) => {
    res.render('index');
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listen port ${port}`));