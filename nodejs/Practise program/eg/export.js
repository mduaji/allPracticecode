const get = require ("./exp.js").get;
//app.use(express.json());
//const coursedtl = [{ id: 1, name: "java" }, { id: 2, name: "node" }, { id: 3, name: ".net" }, { id: 4, name: "sql" }];
//app.get('/api/courses', (req, res) => {
  //  res.json(coursedtl);
//});

/*app.get('/api/courses/:id', (req, res) => {
    const course = coursedtl.find(crs => crs.id === parseInt(req.params.id));
    if (!course) res.status(404).send("the course id is error");
    res.json(course);
});

app.post('/api/courses', (req, res) => {
    const course = {
        id: coursedtl.length + 1,
        name: req.body.name
    }
    const crs = coursedtl.push(course);
    res.json(crs);
});

app.put('/api/courses/:id', (req, res) => {
    const course = coursedtl.find(crs => crs.id === parseInt(req.params.id));
    if (!course) res.status(404).send("the course id error");
    course.name = req.body.name;
    res.json(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = coursedtl.find(crs => crs.id === parseInt(req.params.id));
    if (!course) res.status(404).send("the course id error");
    const index = coursedtl.indexOf(course);
    coursedtl.splice(index, 1);
    res.json(course);
});*/

