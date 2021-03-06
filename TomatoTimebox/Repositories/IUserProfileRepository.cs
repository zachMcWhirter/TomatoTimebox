﻿using System;
using System.Collections.Generic;
using System.Linq;
using TomatoTimebox.Models;

namespace TomatoTimebox.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);

        void Delete(int id);

        List<UserProfile> GetAllUserProfiles();

        UserProfile GetUserProfileById(int id);

        void Update(UserProfile userProfile);

        UserProfile GetByFirebaseUserId(string firebaseUserId);
    }
}