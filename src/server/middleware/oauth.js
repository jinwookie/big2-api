const oauth = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization) {
    const authArray = authorization.split(' ');
    if (authArray.length > 1 && authArray[1] === process.env.TOKEN)
      return next();
  }

  return res.status(401).json({
    error: 'Invalid token'
  });
};

export default oauth;
