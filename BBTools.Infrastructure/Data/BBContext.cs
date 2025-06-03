using BBTools.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace BBTools.Infrastructure.Data;

public class BBContext : DbContext
{
    private static readonly JsonSerializerOptions _jsonOptions = new JsonSerializerOptions
    {
        WriteIndented = true,
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull
    };

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

        modelBuilder.Entity<AntigenSystem>()
            .Property(ags => ags.SystemId)
            .ValueGeneratedNever();

        modelBuilder.Entity<AntigenSystem>()
            .Property(ags => ags.Genes)
            .HasConversion(
                v => v == null || v.Length == 0 ? "[]" : JsonSerializer.Serialize(v, _jsonOptions),
                v => string.IsNullOrEmpty(v) || v == "[]" ? Array.Empty<string>() : JsonSerializer.Deserialize<string[]>(v, _jsonOptions) ?? Array.Empty<string>()
            );

        modelBuilder.Entity<AntigenSystem>()
            .Property(ags => ags.PhenoTypes)
            .HasConversion(
                v => v == null || v.Length == 0 ? "[]" : JsonSerializer.Serialize(v, _jsonOptions),
                v => string.IsNullOrEmpty(v) || v == "[]" ? Array.Empty<string>() : JsonSerializer.Deserialize<string[]>(v, _jsonOptions) ?? Array.Empty<string>()
            );

        modelBuilder.Entity<AntigenSystem>()
            .Ignore(ags => ags.Antigens);

        modelBuilder.Entity<PanelCell>()
            .HasKey(cl => new { cl.Lot, cl.PanelCellNumber} );
        
        // Configure Antigen-AntigenSystem relationship
        modelBuilder.Entity<Antigen>()
            .HasOne(a => a.AntigenSystem)
            .WithMany()
            .HasForeignKey(a => a.SystemId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}