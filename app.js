const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');


const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  //   useFindAndModify: false
});

app.post('/signin', login);
app.post('/signup', createUser);

// app.use(auth);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use((req, res) => {
  res.status(404).send({ message: 'Ресурс не найден' });
});

app.use(errors());

app.use((err, req, res, next) => {
  res.status(500).send({ message: 'На сервере произошла ошибка' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
