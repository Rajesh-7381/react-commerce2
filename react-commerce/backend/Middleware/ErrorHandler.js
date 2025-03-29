const handleAsync = (fn, successMessage, logger) => async (req, res, next) => {
    try {
      const result = await fn(req, res);
      logger.info(successMessage);
      res.json(result);
    } catch (error) {
      logger.error(successMessage);
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports=handleAsync