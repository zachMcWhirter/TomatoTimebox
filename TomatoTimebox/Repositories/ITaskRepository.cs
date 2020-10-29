using System;
using System.Collections.Generic;
using System.Linq;
using TomatoTimebox.Models;

namespace TomatoTimebox.Repositories
{
    public interface ITaskRepository
    {
        List<Task> GetAllTasks();

        Task GetTaskById(int id);

        void Add(Task task);

        void Update(Task task);

        void Delete(int id);

        List<Task> GetAllTasksWithNotes();

        Task GetAllNotesForSingleTaskId(int id);

        List<Task> GetAllTasksForSingleUserId(int id);

        Task GetAllTasksWithNotesForSingleUserId(int id);

        void Toggle(int id, bool isFinished);
    }
}
