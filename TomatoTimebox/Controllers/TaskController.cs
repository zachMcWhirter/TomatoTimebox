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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskRepository _taskRepository;

        //services.AddTransient<INoteRepository, NoteRepository>();


        public TaskController(ITaskRepository taskRepository)

        {
            _taskRepository = taskRepository;
        }

        // Get all Tasks
        // works in:  SQL[x]  Postman[x]
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_taskRepository.GetAllTasks());
        }

        // Get a single Task by its Id
        // works in:  SQL[x]  Postman[x]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_taskRepository.GetTaskById(id));
        }

        // Create a Task
        // works in:  SQL[x]  Postman[x]
        [HttpPost]
        public IActionResult Post(Task task)
        {
            _taskRepository.Add(task);
            return CreatedAtAction("Get", new { id = task.Id }, task);
        }

        // Edit a Task
        // works in:  SQL[x]  Postman[x]
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

        // Delete a Task
        // works in:  SQL[x]  Postman[x]
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _taskRepository.Delete(id);
            return NoContent();
        }

        // Get all Tasks with their Notes
        // works in:  SQL[x]  Postman[x]
        [HttpGet("GetAllWithNotes")]
        public IActionResult GetWithComments()
        {
            var tasks = _taskRepository.GetAllTasksWithNotes();
            return Ok(tasks);
        }

        // Get a single Task with all of its Notes
        // works in:  SQL[x]  Postman[x]
        [HttpGet("GetTaskWithNotes/{id}")]
        public IActionResult GetWithComments(int id)
        {
            var task = _taskRepository.GetTaskByIdWithNotes(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

    }
}
