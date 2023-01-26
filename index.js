const express = require('express');
const users = require('./routes/users');
const bureau = require('./routes/bureau');
const auth = require('./routes/auth');
const app = express();
const cors = require('cors');
const Companies = require('./routes/models/companies');

app.use(cors())

app.set("port", process.env.PORT || 3000);

app.use(express.json())

//routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
// app.use('/users',users);
app.use('/auth', auth);
// app.use('/posts',posts);
app.use('/companies', Companies);


app.listen(app.get("port"), ()=>{
    console.log("server running on port " + app.get("port"));
});

