const handler = async (req, res) => res.status(200).send({ success: true });

export default {
  handler,
  method: 'GET',
  name: 'AuthCheck',
  path: '/whothatis',
};
