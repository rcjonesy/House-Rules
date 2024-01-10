using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using HouseRules.Models;
using Microsoft.AspNetCore.Identity;


namespace HouseRules.Data;
//IdentityDbContext<TUser> is a class provided by ASP.NET Core Identity, which extends the functionalities of DbContext
public class HouseRulesDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;

    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Chore> Chores { get; set; }
    public DbSet<ChoreAssignment> ChoreAssignments { get; set; }
    public DbSet<ChoreCompletion> ChoreCompletions { get; set; }

    public HouseRulesDbContext(DbContextOptions<HouseRulesDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }
    //The Ids for the Identity Framework tables are Guids, not ints. A Guid (Global Unique Identifier) can be generated with Guid.NewGuid(). 
    // You will need to do this when you create your own data to seed.
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        //IdentityRole - this will hold the various roles that a use can have
        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });
        //IdentityUser - this will hold login credentials for users
        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });
        //IdentityUserRole - a many-to-many table between roles and users. These define which users have which roles.
        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Admina",
            LastName = "Strator",
            Address = "101 Main Street",
        });

        modelBuilder.Entity<Chore>().HasData(new Chore[]
    {
            new Chore { Id = 1, Name = "Mow Lawn", Difficulty = 2, ChoreFrequencyDays = 5 },
            new Chore { Id = 2, Name = "Do Dishes", Difficulty = 3, ChoreFrequencyDays = 2 },
            new Chore { Id = 3, Name = "Fold Laundry", Difficulty = 1, ChoreFrequencyDays = 3 },
            new Chore { Id = 4, Name = "Vacuum Floors", Difficulty = 4, ChoreFrequencyDays = 4 },
            new Chore { Id = 5, Name = "Walk the Pet Rock", Difficulty = 5, ChoreFrequencyDays = 1 },
            new Chore { Id = 6, Name = "Talk to House Plants", Difficulty = 1, ChoreFrequencyDays = 7 },
            new Chore { Id = 7, Name = "Sweep Away Bad Vibes", Difficulty = 3, ChoreFrequencyDays = 6 },
            new Chore { Id = 8, Name = "Sing a Duet with the Vacuum Cleaner", Difficulty = 5, ChoreFrequencyDays = 7 },
            new Chore { Id = 9, Name = "Dust Off Old Vinyl Records", Difficulty = 2, ChoreFrequencyDays = 4 }
    });

        modelBuilder.Entity<ChoreAssignment>().HasData(new ChoreAssignment[]
        {
            new ChoreAssignment { Id = 1, UserProfileId = 1, ChoreId = 1 },
            new ChoreAssignment { Id = 2, UserProfileId = 1, ChoreId = 2 },
            new ChoreAssignment { Id = 3, UserProfileId = 1, ChoreId = 3 }
            
         
        });

        modelBuilder.Entity<ChoreCompletion>().HasData(new ChoreCompletion[]
        {
            new ChoreCompletion { Id = 1, UserProfileId = 1, ChoreId = 1, CompletedOn = DateTime.Now.AddDays(-1)}
        });

    }
}