const del = async(req, res) => {
  try {
    req.DATA = { ...req.params };
  } catch (error) {
    console.warn('POST ERROR', error);
    return res.status(500).send({ error: 'my bad' });
  }
};

export default del;
