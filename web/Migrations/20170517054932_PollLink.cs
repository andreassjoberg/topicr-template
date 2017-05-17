using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace topicr.Migrations
{
    public partial class PollLink : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Link",
                table: "Polls",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Polls_Link",
                table: "Polls",
                column: "Link",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Polls_Link",
                table: "Polls");

            migrationBuilder.DropColumn(
                name: "Link",
                table: "Polls");
        }
    }
}
