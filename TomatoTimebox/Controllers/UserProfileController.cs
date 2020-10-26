﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TomatoTimebox.Models;
using TomatoTimebox.Repositories;

namespace TomatoTimebox.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
            
        }

        //Get all UserProfiles
        // works in:  SQL[x]  Postman[x]
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_userProfileRepository.GetAllUserProfiles());
        }

        // Get a single UserProfile by its Id
        // works in:  SQL[x]  Postman[x]
        [HttpGet("{id}")]
        public IActionResult GetUserProfile(int id)

        {
            return Ok(_userProfileRepository.GetUserProfileById(id));
        }


        // Create a UserProfile
        // Create method has a bug. It creates the object but it is breaking before
        // when it is created. It posts with the list after refresh
        // works in:  SQL[x]  Postman[ ]
        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId }, userProfile);
                
        }

        // Edit a UserProfile
        // works in:  SQL[x]  Postman[x]
        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, UserProfile userProfile)
        {
            if (id != userProfile.Id)
            {
                return BadRequest();
            }
            _userProfileRepository.Update(userProfile);
            return NoContent();
        }

        // Delete a UserProfile
        // works in:  SQL[x]  Postman[x]
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _userProfileRepository.Delete(id);
            return NoContent();
        }
    }
}
