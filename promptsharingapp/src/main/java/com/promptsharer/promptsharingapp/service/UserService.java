package com.promptsharer.promptsharingapp.service;

import com.promptsharer.promptsharingapp.entity.JournalEntry;
import com.promptsharer.promptsharingapp.entity.User;
import com.promptsharer.promptsharingapp.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService  {

    @Autowired
    private UserRepository userRepository;

    public void saveEntry(User entry) {
        userRepository.save(entry);
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User findByUserName(String username) {
        return userRepository.findByUsername(username);
    }

    public User getById(ObjectId id) {
        return userRepository.findById(id).orElse(null);
    }

}
