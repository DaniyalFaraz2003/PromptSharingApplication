package com.promptsharer.promptsharingapp.controller;


import com.promptsharer.promptsharingapp.entity.User;
import com.promptsharer.promptsharingapp.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    // Add your code here

    @PutMapping
    public ResponseEntity<?> saveUser(@RequestBody User user) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User existingUser = userService.findByUserName(username);
        existingUser.setUsername(user.getUsername());
        existingUser.setEmail(user.getEmail());
        existingUser.setName(user.getName());
        existingUser.setImage(user.getImage());
        existingUser.setPassword(user.getPassword());
        userService.saveNewUser(existingUser);
        return ResponseEntity.ok("User updated successfully");
    }


    @GetMapping("/{id}")
    public User getById(@PathVariable ObjectId id) {
        return userService.getById(id);
    }
}
