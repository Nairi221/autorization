const express = require('express');
const redis = require('redis');
const authRoutes = require('./routs/auth');
const bodyParser = require('body-parser');
const analyticsRoutes = require('./routs/analytics');
const categoryRoutes = require('./routs/category');
const orderRoutes = require('./routs/order');
const positionRoutes = require('./routs/position');

const app = express();
const client = redis.createClient();
client.on_connect('connect' , function (){
    console.log('connected')
});



// es paragayum kstananq tvyal hascen //localhost:5000/api/auth/login

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: true}));// tuyla tais en kod anel vorosh tvyalner
app.use(bodyParser.json());// generacnuma js tvyalner json papkic
app.use(require('cors')());

app.use('/api/auth',authRoutes);//avelacnum enq bazzvi hascen  u erkrord argument authRooutes tvyalner@
app.use('/api/analytics',analyticsRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/order',orderRoutes);
app.use('/api/position',positionRoutes);
//testing server
// app.get('/',(req,res) =>{
//     res.status(200).json({message: 'working'})
// })



module.exports = app