/*==
Express requirement 
==*/
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()

require('dotenv').config();

app.use(cors()); 
app.use(bodyParser.json()); 

/*==
database connection and server launch
==*/
mongoose.connect(process.env.DB)
    .then(() => console.log('mongodb is connected'))
    .catch(err => console.log(err))

const PORT =  process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`app running on : http://127.0.0.1:8080`) )
//app.listen(PORT, ()=> console.log(`app running on : ${ PORT }`) )

/*==
Routes
==*/
const patients = require('./routes/api/patients');
app.use('/api/patients', patients);

const actes = require('./routes/api/actes');
app.use('/api/actes', actes);

const rendez_vs = require('./routes/api/rendez_vs');
app.use('/api/rendez_vs', rendez_vs);

const users = require('./routes/api/users');
app.use('/api/users', users);