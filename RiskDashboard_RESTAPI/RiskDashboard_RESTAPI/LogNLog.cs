using NLog;

namespace RiskDashboard_RESTAPI
{
    public class LogNLog : ILog
    {
        private static NLog.ILogger logger = LogManager.GetCurrentClassLogger();

        /// <summary>
        /// LogNLog Constructor
        /// </summary>
        public LogNLog()
        {

        }

        /// <summary>
        /// Information
        /// </summary>
        /// <param name="message"></param>
        public void Information(string message)
        {
            logger.Info(message);
        }

        /// <summary>
        /// Warning
        /// </summary>
        /// <param name="message"></param>
        public void Warning(string message)
        {
            logger.Warn(message);
        }

        /// <summary>
        /// Debug
        /// </summary>
        /// <param name="message"></param>
        public void Debug(string message)
        {
            logger.Debug(message);
        }

        /// <summary>
        /// Error
        /// </summary>
        /// <param name="message"></param>
        public void Error(string message)
        {
            logger.Error(message);
        }
    }
}
