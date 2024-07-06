namespace RiskDashboard_RESTAPI
{
    public interface ILog
    {
        /// <summary>
        /// Information
        /// </summary>
        /// <param name="message"></param>
        void Information(string message);


        /// <summary>
        /// Warning
        /// </summary>
        /// <param name="message"></param>
        void Warning(string message);

        /// <summary>
        /// Debug
        /// </summary>
        /// <param name="message"></param>
        void Debug(string message);

        /// <summary>
        /// Error
        /// </summary>
        /// <param name="message"></param>
        void Error(string message);
    }
}
