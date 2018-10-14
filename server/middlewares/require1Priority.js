module.exports = (req, res, next) => {
  if (req.user.priority !== 1) {
    console.log(req.user.priority)
    return res.status(401).send({ error: "Unauthorized " });
  }

  next();
};
