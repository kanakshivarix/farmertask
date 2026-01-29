import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, {
    method: req.method,
    url: req.originalUrl,
    stack: err.stack,
  });

  res.status(err.status || 500).json({
    message: err.message || "Server Error",
  });
};

export default errorHandler;
