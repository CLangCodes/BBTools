using BBTools.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace BBTools.Infrastructure.Data;

public class BBContext : DbContext
{
    public DbSet<Antigen> Antigens { get; set; }
    public DbSet<AntigenSystem> AntigenSystems { get; set; }
    public DbSet<PanelCell> PanelCells { get; set; }

    public BBContext(DbContextOptions<BBContext> options) : base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Antigen>()
            .HasKey(ag => ag.ISBTNumber);

        modelBuilder.Entity<AntigenSystem>()
            .HasKey(ags => ags.SystemId);

        modelBuilder.Entity<PanelCell>()
            .HasKey(cl => new { cl.Lot, cl.PanelCellNumber} );
        
        // Configure your entity relationships and constraints here
        // Example:
        // modelBuilder.Entity<YourEntity>()
        //     .HasKey(e => e.Id);
    }
}