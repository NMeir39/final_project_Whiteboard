using Microsoft.EntityFrameworkCore;

namespace signal.Api.Models
{
    public class WhiteBoardDBContext : DbContext
    {

        public WhiteBoardDBContext(DbContextOptions options) : base(options)
        { }

        public DbSet<Dot> Dots {get; set;}

        public DbSet<ChatMessage> Messages {get; set;}
        

    }
}