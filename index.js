const express = require('express');
const users = require('./routes/users');
const bureau = require('./routes/bureau');
const auth = require('./routes/auth');
const Companies = require('./routes/companies');
const app = express();
const cors = require('cors');
const PostalCodes = require('./routes/postalcode');
const ContributionAccountCodes = require('./routes/contributionaccount');
const Agreements = require('./routes/agreements');

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
app.use('/users', users);
app.use('/companies', Companies);
app.use('/postalcode', PostalCodes);
app.use('/companies', ContributionAccountCodes);
app.use('/companies', Agreements);
// app.use('/posts',posts);


app.listen(app.get("port"), ()=>{
    console.log("server running on port " + app.get("port"));
});

