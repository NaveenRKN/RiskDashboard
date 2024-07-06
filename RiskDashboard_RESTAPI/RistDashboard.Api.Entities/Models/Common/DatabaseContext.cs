using Microsoft.EntityFrameworkCore;
using RistDashboard.Api.Entities.Models;
using RistDashboard.Api.Entities.ViewModel;

namespace RiskDashboard_RESTAPI.Models.Common
{
    public partial class DatabaseContext : DbContext
    {
        public DatabaseContext()
        {
        }

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProjectDetailsViewModel>().HasNoKey();
            modelBuilder.Entity<RiskInformationViewModel>().HasNoKey();
            modelBuilder.Entity<RiskDashboardViewModel>().HasNoKey();
            modelBuilder.Entity<ActionStatusViewModel>().HasNoKey().ToView("ActionStatusViewModel");
        }
        public virtual DbSet<ProjectDetails> ProjectDetails { get; set; }
        public virtual DbSet<RiskInformation> RiskInformation { get; set; }
        public virtual DbSet<ProjectDetailsViewModel> ProjectDetailsViewModel { get; set; }
        public virtual DbSet<RiskInformationViewModel> RiskInformationViewModel { get; set; }
        public virtual DbSet<RiskDashboardViewModel> RiskDashboardViewModel { get; set; }
        public virtual DbSet<RowIdentifier> RowIdentifiers { get; set; }
        public virtual DbSet<FileImportDetails> FileImportDetails { get; set; }
        public virtual DbSet<UserModel> UserModel { get; set; }
        public virtual DbSet<UserToDoList> UserToDoList { get; set; }  
    }
}
