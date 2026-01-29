import winston from 'winston'
import DailyRotateFile from "winston-daily-rotate-file";
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH-mm-ss' }),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxFiles: "14d",   // 14 din baad delete
    }),

    //  sare daily k logs show
      new DailyRotateFile({
      filename: "logs/app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "30d",
    }),

    ],

});
if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console());
}
export default logger