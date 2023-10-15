const data = (req, res, done) => {
  req.DATA = {
    ...req.params,
    ...req.query,
    ...req.USER,
    userId: req.USER,
  };

  done();
};

export default data;
