const wrapper = async (cb, req, res) => {
  const { DATA } = req;
  const values = await cb(DATA);

  if (values.error) {
    const errorMap = {
      catch: 500,
      query: 400,
    };

    const status = errorMap[values.error] || 494;
    return res.status(status).send({ error: values.message });
  }

  return res.send({ results: values });
};

export default wrapper;
