const tokenChecker = (req, res, next) => {
  const headers = req.headers;
  if (headers['access_token']) next()
  else res.send({error: 'empty access token'}).status(404);
}

module.exports = tokenChecker;