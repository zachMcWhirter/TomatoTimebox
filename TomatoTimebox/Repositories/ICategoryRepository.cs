using System.Collections.Generic;
using TomatoTimebox.Models;

namespace TomatoTimebox.Repositories
{
    public interface ICategoryRepository
    {
        void AddCategory(Category category);
        void DeleteCategory(int id);
        void EditCategory(Category category);
        List<Category> GetAllCategories();
        Category GetCategoryById(int id);
    }
}