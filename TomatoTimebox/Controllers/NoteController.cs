using System;
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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly INoteRepository _noteRepository;

        public NoteController(INoteRepository noteRepository)

        {
            _noteRepository = noteRepository;
        }

        // Get all Notes
        // works in:  SQL[x]  Postman[x]
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_noteRepository.GetAllNotes());
        }

        // Get a single Note by its Id
        // works in:  SQL[x]  Postman[x]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_noteRepository.GetNoteById(id));
        }

        // Create a Note
        // works in:  SQL[x]  Postman[x]
        [HttpPost]
        public IActionResult Post(Note note)
        {
            note.CreateDateTime = DateTime.Now;

            _noteRepository.Add(note);
            return CreatedAtAction("Get", new { id = note.Id }, note);
        }

        // Edit a Note
        // works in:  SQL[x]  Postman[x]
        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, Note note)
        {
            if (id != note.Id)
            {
                return BadRequest();
            }
            _noteRepository.Update(note);
            return NoContent();
        }

        // Delete a Note
        // works in:  SQL[x]  Postman[x]
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _noteRepository.Delete(id);
            return NoContent();
        }

    }
}
