const express = require('express');
const app = express();
const port = 4500;
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const path = require('path')


app.set('view engine', 'ejs');
app.set('views',  'views');


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route
app.get('/', (req, res) => {
    res.render('home');
   
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define a route to handle form submissions

app.post('/home', (req, res) => {
  const { name, email, message } = req.body;

  // Create a nodemailer transporter
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465, // or 465 for SSL
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.email, // replace with your email address
        pass: 'apab bcje vgdf wiwx' // replace with your password
      },
    });

    // Setup email data
    const mailOptions = {
      from: req.body.email,
      to: process.env.email,
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully');
      }
    });
  } catch(err) { 
    console.log(err)
  }

});


app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/skills', (req, res) => {
  res.render('skills');
});

app.get('/experience', (req, res) => {
  res.render('experience');
});

app.get('/contacts', (req, res) => {
  res.render('contacts');
});

// Start the serverss
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


module.exports = app