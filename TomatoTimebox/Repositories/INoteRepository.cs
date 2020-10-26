using System;
using System.Collections.Generic;
using System.Linq;
using TomatoTimebox.Models;

namespace TomatoTimebox.Repositories
{
    public interface INoteRepository
    {
        List<Note> GetAllNotes();

        Note GetNoteById(int id);

        void Add(Note note);

        void Update(Note note);

        void Delete(int id);
    }
}
