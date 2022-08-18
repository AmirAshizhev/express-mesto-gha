const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'необходма авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-word');
  } catch (err) {
    return res.status(401).send({ message: 'необходма авторизацияdd' });
  }

  req.user = payload;
  next();
};