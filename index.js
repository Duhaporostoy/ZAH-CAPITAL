const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

// Настройка транспорта для Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // или другой почтовый сервис
  auth: {
    user: process.env.EMAIL_USER, // ваш email
    pass: process.env.EMAIL_PASS  // ваш пароль от email
  }
});

app.post('/send-message', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email, // Отправитель (тот, кто заполнил форму)
    to: process.env.RECEIVER_EMAIL, // Email, на который отправлять сообщения
    subject: `Новое сообщение от ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Отправка email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Ошибка при отправке сообщения');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Сообщение отправлено');
    }
  });
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
