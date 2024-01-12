using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HouseRules.Data;
using HouseRules.Models.DTOs;
using HouseRules.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Runtime.InteropServices;
using System.ComponentModel.DataAnnotations;


namespace HouseRules.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChoreController : ControllerBase
{
    private HouseRulesDbContext _dbContext;

    public ChoreController(HouseRulesDbContext context)
    {
        _dbContext = context;
    }

    //=================================================================================================

    //Get All Chores
    [HttpGet]
    // [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Chores
            .Select(chore => new ChoreDTO
            {
                Id = chore.Id,
                Name = chore.Name,
                Difficulty = chore.Difficulty,
                ChoreFrequencyDays = chore.ChoreFrequencyDays
            })
            .ToList());
    }
    //=================================================================================================

    //Get All Chores by Id
    [HttpGet("{id}")]
    // [Authorize]

    public IActionResult GetChoreById(int id)
    {
        Chore? chore = _dbContext.Chores
            .Include(c => c.ChoreCompletions)

            .Include(c => c.ChoreAssignments)
                .ThenInclude(ca => ca.UserProfile)
            .SingleOrDefault(c => c.Id == id);

        if (chore == null)
        {
            return NotFound();
        }


        ChoreDTO choreDTO = new ChoreDTO
        {
            Id = chore.Id,
            Name = chore.Name,
            Difficulty = chore.Difficulty,
            ChoreFrequencyDays = chore.ChoreFrequencyDays,

            ChoreAssignments = chore.ChoreAssignments.Select(ca => new ChoreAssignmentDTO
            {
                Id = ca.Id,
                UserProfileId = ca.UserProfileId,
                UserProfile = new UserProfileDTO
                {
                    Id = ca.UserProfile.Id,
                    FirstName = ca.UserProfile.FirstName,
                    LastName = ca.UserProfile.LastName
                }
            }).ToList(),

            // Mapping ChoreCompletions in ChoreDTO
            ChoreCompletions = chore.ChoreCompletions.Select(cc => new ChoreCompletionDTO
            {
                Id = cc.Id,
                UserProfileId = cc.UserProfileId,
                // UserProfile = new UserProfileDTO
                // {
                //     Id = cc.UserProfile.Id,
                //     FirstName = cc.UserProfile.FirstName,
                //     LastName = cc.UserProfile.LastName

                // },

                CompletedOn = cc.CompletedOn
            }).ToList()
        };
        return Ok(choreDTO);

    }

    //=================================================================================================

    //post New Chore

    [HttpPost]
    // [Authorize]

    public IActionResult NewChore(Chore newChore)
    {

        _dbContext.Chores.Add(newChore);
        _dbContext.SaveChanges();
        return Created($"/api/chore/{newChore.Id}", newChore);
    }

    //=================================================================================================

    //Edit Chore

    [HttpPut("{id}")]
    [Authorize]
    public IActionResult UpdateChore(int id, Chore updatedChore)
    {
        Chore? choreToUpdate = _dbContext.Chores.SingleOrDefault(c => c.Id == id);

        if (choreToUpdate == null)
        {
            return NotFound();
        }

        // Apply changes directly to the entity fetched from the database
        choreToUpdate.Name = updatedChore.Name;
        choreToUpdate.Difficulty = updatedChore.Difficulty;
        choreToUpdate.ChoreFrequencyDays = updatedChore.ChoreFrequencyDays;

        _dbContext.SaveChanges();

        return Ok("Chore updated successfully");
    }

    //=================================================================================================
    //Delete Chore

    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult DeleteChore(int id)
    {
        Chore? choreToDelete = _dbContext.Chores.SingleOrDefault(c => c.Id == id);

        if (choreToDelete == null)
        {
            return NotFound();
        }

        _dbContext.Chores.Remove(choreToDelete);
        _dbContext.SaveChanges();

        return Ok("Chore deleted successfully");
    }

    //=================================================================================================
    //date completed with query params
    [HttpPost("{id}/complete")]
    // [Authorize]
    public IActionResult CompleteChore(int id, int userId)
    {
        // Step 1: Retrieve the chore object from the database based on the provided 'id'
        Chore? choreToComplete = _dbContext.Chores.SingleOrDefault(c => c.Id == id);

        // Step 2: Check if the chore exists; if not found, return a NotFound response
        if (choreToComplete == null)
        {
            return NotFound();
        }

        // Step 3: Set the CompletedOn property to the current date/time (UTC)
        DateTime completedOn = DateTime.UtcNow;

        // Step 4: Create a new ChoreCompletion object to represent the completed chore
        ChoreCompletion newChoreCompletion = new ChoreCompletion
        {
            // Step 5: Assign the 'userId' to the 'UserProfileId' of the ChoreCompletion
            UserProfileId = userId,

            // Step 6: Assign the 'id' of the chore being completed to the 'ChoreId' of the ChoreCompletion
            ChoreId = choreToComplete.Id,

            // Step 7: Set the 'CompletedOn' property to the current date/time
            CompletedOn = completedOn
        };

        // Step 8: Add the newly created ChoreCompletion object to the database context
        _dbContext.ChoreCompletions.Add(newChoreCompletion);

        _dbContext.SaveChanges();

        return NoContent();
    }

    //assign with query params
    [HttpPost("{id}/assign")]
    // [Authorize]
    public IActionResult AssignChore(int id, int userId)
    {
        // Step 1: Retrieve the chore object from the database based on the provided 'id'
        Chore? choreToAssign = _dbContext.Chores.SingleOrDefault(c => c.Id == id);

        // Step 2: Check if the chore exists; if not found, return a NotFound response
        if (choreToAssign == null)
        {
            return NotFound();
        }

        // Step 3: Create a new ChoreAssignment object to assign the chore to the user
        ChoreAssignment newChoreAssignment = new ChoreAssignment
        {
            // Step 4: Assign the 'userId' to the 'UserProfileId' of the ChoreAssignment
            UserProfileId = userId,

            // Step 5: Assign the 'id' of the chore to be assigned to the 'ChoreId' of the ChoreAssignment
            ChoreId = id
        };

        // Step 6: Add the newly created ChoreAssignment object to the database context
        _dbContext.ChoreAssignments.Add(newChoreAssignment);

        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpPost("{id}/unassign")]
    // [Authorize]
    public IActionResult UnassignChore(int id, int userId)
    {
        // Find the chore assignment to unassign
        ChoreAssignment? choreAssignmentToRemove = _dbContext.ChoreAssignments.FirstOrDefault(ca => ca.ChoreId == id && ca.UserProfileId == userId);

        // Check if the chore assignment exists; if not found, return a NotFound response
        if (choreAssignmentToRemove == null)
        {
            return NotFound();
        }

        // Remove the found ChoreAssignment from the database context
        _dbContext.ChoreAssignments.Remove(choreAssignmentToRemove);

        // Save the changes to the database
        _dbContext.SaveChanges();

        return NoContent();
    }




}


