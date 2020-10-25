﻿using System;
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
    }
}
