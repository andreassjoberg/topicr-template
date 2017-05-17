using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using topicr.Models;

namespace topicr.Migrations
{
    [DbContext(typeof(PollContext))]
    [Migration("20170517054932_PollLink")]
    partial class PollLink
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("topicr.Models.Alternative", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<int>("PollId");

                    b.HasKey("Id");

                    b.HasIndex("PollId");

                    b.ToTable("Alternatives");
                });

            modelBuilder.Entity("topicr.Models.Poll", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDateTime");

                    b.Property<string>("Description");

                    b.Property<string>("Link");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.HasIndex("Link")
                        .IsUnique();

                    b.ToTable("Polls");
                });

            modelBuilder.Entity("topicr.Models.Reply", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AlternativeId");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("AlternativeId");

                    b.ToTable("Replies");
                });

            modelBuilder.Entity("topicr.Models.Alternative", b =>
                {
                    b.HasOne("topicr.Models.Poll", "Poll")
                        .WithMany("Alternatives")
                        .HasForeignKey("PollId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("topicr.Models.Reply", b =>
                {
                    b.HasOne("topicr.Models.Alternative", "Alternative")
                        .WithMany()
                        .HasForeignKey("AlternativeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
