const express = require("express");

const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const knex = require('knex');
const { response } = require("express");

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : 'postgresql-curved-12350',
      port : 5432,
      user : 'postgres',
      password : 'sql',
      database : 'facerecogniser'
    }
});





app.get('/', (req, res)=>{
    res.send('success');
})

app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id',(req,res) => { profile.handleProfileGet(req,res,db)} )

app.put('/image', (req,res) => {image.handleImage(req,res,db)})
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})





// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(process.env.PORT || 3000,()=>{
    console.log(`app is running on port ${process.env.PORT}`);
})