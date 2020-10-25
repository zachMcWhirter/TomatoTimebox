using System;
using System.Collections.Generic;
using System.Linq;
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
    public class TaskController : ControllerBase
    {
        private readonly ITaskRepository _taskRepository;

        
        public TaskController(ITaskRepository taskRepository)

        {
            _taskRepository = taskRepository;
        }

        // Get all Tasks
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_taskRepository.GetAllTasks());
        }

        // Get a single Task by its Id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_taskRepository.GetTaskById(id));
        }

        // Add a Task
        [HttpPost]
        public IActionResult Post(Task task)
        {
            _taskRepository.Add(task);
            return CreatedAtAction("Get", new { id = task.Id }, task);
        }

        // Edit a Task
        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, Task task)
        {
            if (id != task.Id)
            {
                return BadRequest();
            }
            _taskRepository.Update(task);
            return NoContent();
        }

    }
}
