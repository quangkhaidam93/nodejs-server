const logger = (req, res) => {
  console.log('khai logger triggered');
  res.send({message: "Done!"});
}

module.exports = logger;