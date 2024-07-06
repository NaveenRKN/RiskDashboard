using MimeKit;
using RistDashboard.Api.Entities;
using MailKit.Net.Smtp;
using MailKit.Security;
using System.Text.RegularExpressions;
using RistDashboard.Api.Entities.ViewModel;
using System.Collections.Generic;
using System;
using nClam;

namespace RiskDashboard.Api.Services.Helper
{
    public static class ServiceHelper
    {
        public static async Task<EmailNotificationViewModel> SendEmail(string to, string subject, string body, string? owner, int? riskId, DateTime? targetClosureDate)
        {
           EmailNotificationViewModel emailNotification = new EmailNotificationViewModel();
            try
            {
                emailNotification.Owner = owner;
                emailNotification.RiskId = riskId;
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(AppSettings.FromEmailId, AppSettings.SmtpUsername));
                message.To.Add(new MailboxAddress("User", to));
                message.Subject = subject;

                body = Regex.Replace(body, "{{OwnerName}}", owner, RegexOptions.IgnoreCase);
                body = Regex.Replace(body, "{{RISKID}}", riskId.Value.ToString(), RegexOptions.IgnoreCase);
                body = Regex.Replace(body, "{{TargetClosureDate}}", targetClosureDate !=null ? targetClosureDate.Value.ToString("dd-MMM-yyyy"): "", RegexOptions.IgnoreCase);                
                var bodyBuilder = new BodyBuilder { HtmlBody = body };
                message.Body = bodyBuilder.ToMessageBody();
                using (var client = new SmtpClient())
                {
                    await client.ConnectAsync(AppSettings.SmtpServer, Convert.ToInt16(AppSettings.SmtpPort), SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync(AppSettings.SmtpUsername, AppSettings.SmtpPassword);
                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }                
                emailNotification.IsEmailSend = true;
            }
            catch
            {
                emailNotification.IsEmailSend = false;
            }
            return emailNotification;
        }

        public async static Task<bool> FileScanByBytes(byte[] fileBytes)
        {
            var clam = new ClamClient(AppSettings.ClamAVServerURL, Convert.ToInt32(AppSettings.ClamAVServerPort));
            var scanResult = await clam.SendAndScanFileAsync(fileBytes);
            if (scanResult != null)
            {
                switch (scanResult.Result)
                {
                    case ClamScanResults.Clean:
                        //throw new Exception($"The file is clean! ScanResult:" + scanResult.RawResult);
                        break;
                    case ClamScanResults.VirusDetected:
                        throw new Exception(string.Concat("ScanResult: Virus Found! Virus name:", scanResult.InfectedFiles != null ? scanResult.InfectedFiles.FirstOrDefault().VirusName : ""));
                    case ClamScanResults.Error:
                        throw new Exception("An error occured while scaning the file! ScanResult:" + scanResult.RawResult);
                    case ClamScanResults.Unknown:
                        throw new Exception("Unknown scan result while scaning the file! ScanResult:" + scanResult.RawResult);
                }
            }
            return true;
        }
        public async static Task<bool> FileScanByStream(MemoryStream memoryStream)
        {
            byte[] fileBytes = memoryStream.ToArray();
            return await FileScanByBytes(fileBytes);
        }
    }
}
