const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '62ef8cd8fb7032b977845a72'
  };

  next();
});
// app.get('/', (req, res) =>{
//   res.send('Hello world')
// })

// app.post('/', express.json(), (req, res) => {
//   res.send(req.body)
// })


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  //   useFindAndModify: false
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'))

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});



