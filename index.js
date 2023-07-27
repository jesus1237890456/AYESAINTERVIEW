const express = require('express');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();
const cors = require('cors');
//utilizacion de express para levantar el servicio si va todo  bien e indicar donde estan las rutas

app.use(cors())

app.set("port", process.env.PORT || 3000);

app.use(express.json())
  //routes
app.use('/auth', auth);
app.use('/users', users);

app.listen(app.get("port"), ()=>{
    console.log("server running on port " + app.get("port"));
});

