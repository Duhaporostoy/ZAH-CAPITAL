const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

app.post('/send-message', (req, res) => {
  const { name, email, message } = req.body;

  const logMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;
  
  fs.appendFile('messages.txt', logMessage, (err) => {
    if (err) {
      return res.status(500).send('Ошибка при сохранении сообщения');
    }
    res.status(200).send('Сообщение отправлено');
  });
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
