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
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        // Get all Categories
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_categoryRepository.GetAllCategories());
        }

        // Get a single Category by its Id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_categoryRepository.GetCategoryById(id));
        }

        // Add a Category
        [HttpPost]
        public IActionResult Post(Category category)
        {
            _categoryRepository.AddCategory(category);
            return CreatedAtAction("Get", new { id = category.Id }, category);
        }

        // Edit a Category
        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, Category category)
        {
             if(id != category.Id)
            {
                return BadRequest();
            }
            _categoryRepository.EditCategory(category);
            return NoContent();
        }

        // Delete a Category
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _categoryRepository.DeleteCategory(id);
            return NoContent();
        }

    }
}
