const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 4000;

app.set("view engine", ".hbs");
app.set('views', path.join(__dirname, 'views'));

app.engine(
    '.hbs', 
hbs({
    defaultLayout: "main",
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: ".hbs"
})
);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.urlencoded({
    extended: false
}));

// correo config
const  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASS, // generated ethereal password
    },
  });

  transporter.verify().then(()=> {
    console.log('Ready to send');
  })

// rutas
app.get('/', (req, res)=>{
res.render('Home');
});

app.get('/gallery', (req, res)=>{
    res.render('gallery');
})

app.get('/activities', (req, res)=>{
    res.render('activities');
})

app.get('/aboutus', (req, res)=>{
    res.render('aboutus');
})

app.get('/Contacto', (req, res)=>{
    res.render('contacto');
})

app.post('/Contacto', async(req, res)=>{
        await transporter.sendMail({
        from: process.env.MAIL_USER, // sender address
        to: process.env.MAIL_USER, // list of receivers
        subject: `${req.body.name} Art Alley`, // Subject line
        text: "Hello", // plain text body
        html: `<h1>name: ${req.body.name}</h1>
        <h1>mail: ${req.body.email}</h1>
        <h1>telephone: ${req.body.telephone}</h1>
        <p>${req.body.message}</p>`, // html body
      });
    res.redirect('/');
})

app.listen(PORT, ()=> {
//  console.log(__dirname);
 console.log (`server at http://localhost:${PORT}`);   
})

app.use((req, res)=>{
    res.render("404");
})