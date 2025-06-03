using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BBTools.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AntigenSystems",
                columns: table => new
                {
                    SystemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SystemName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Genes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhenoTypes = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AntigenSystems", x => x.SystemId);
                });

            migrationBuilder.CreateTable(
                name: "PanelCells",
                columns: table => new
                {
                    Lot = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PanelCellNumber = table.Column<int>(type: "int", nullable: false),
                    Manufacturer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExpirationDate = table.Column<DateOnly>(type: "date", nullable: false),
                    D = table.Column<int>(type: "int", nullable: false),
                    C = table.Column<int>(type: "int", nullable: false),
                    LittleC = table.Column<int>(type: "int", nullable: false),
                    E = table.Column<int>(type: "int", nullable: false),
                    LittleE = table.Column<int>(type: "int", nullable: false),
                    F = table.Column<int>(type: "int", nullable: false),
                    Cw = table.Column<int>(type: "int", nullable: false),
                    Vell = table.Column<int>(type: "int", nullable: false),
                    Kell = table.Column<int>(type: "int", nullable: false),
                    Cellano = table.Column<int>(type: "int", nullable: false),
                    Kpa = table.Column<int>(type: "int", nullable: false),
                    Kpb = table.Column<int>(type: "int", nullable: false),
                    Jsa = table.Column<int>(type: "int", nullable: false),
                    Jsb = table.Column<int>(type: "int", nullable: false),
                    Fya = table.Column<int>(type: "int", nullable: false),
                    Fyb = table.Column<int>(type: "int", nullable: false),
                    Jka = table.Column<int>(type: "int", nullable: false),
                    Jkb = table.Column<int>(type: "int", nullable: false),
                    Xga = table.Column<int>(type: "int", nullable: false),
                    Lea = table.Column<int>(type: "int", nullable: false),
                    Leb = table.Column<int>(type: "int", nullable: false),
                    S = table.Column<int>(type: "int", nullable: false),
                    LittleS = table.Column<int>(type: "int", nullable: false),
                    M = table.Column<int>(type: "int", nullable: false),
                    N = table.Column<int>(type: "int", nullable: false),
                    P1 = table.Column<int>(type: "int", nullable: false),
                    Lua = table.Column<int>(type: "int", nullable: false),
                    Lub = table.Column<int>(type: "int", nullable: false),
                    HLAPos = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PanelCells", x => new { x.Lot, x.PanelCellNumber });
                });

            migrationBuilder.CreateTable(
                name: "Antigens",
                columns: table => new
                {
                    ISBTNumber = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SystemId = table.Column<int>(type: "int", nullable: false),
                    SystemName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AntigenSystemSystemId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Antigens", x => x.ISBTNumber);
                    table.ForeignKey(
                        name: "FK_Antigens_AntigenSystems_AntigenSystemSystemId",
                        column: x => x.AntigenSystemSystemId,
                        principalTable: "AntigenSystems",
                        principalColumn: "SystemId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Antigens_AntigenSystemSystemId",
                table: "Antigens",
                column: "AntigenSystemSystemId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Antigens");

            migrationBuilder.DropTable(
                name: "PanelCells");

            migrationBuilder.DropTable(
                name: "AntigenSystems");
        }
    }
}
