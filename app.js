//Importing required Packages
const express = require('express');
const expressLayout = require('express-ejs-layouts')
const app = express();

//Configuring Server
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayout);
app.use(express.json());
app.use(express.static('public'));

//Setting up the Routes
const viewRouter = require('./routes/index');
app.use('/', viewRouter);

//Starting Server
app.listen(process.env.PORT || 3000, () => console.log("Server Started..."));