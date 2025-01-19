package com.promptsharer.promptsharingapp.controller;


import com.promptsharer.promptsharingapp.entity.User;
import com.promptsharer.promptsharingapp.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    // Add your code here



    @GetMapping("/{id}")
    public User getById(@PathVariable ObjectId id) {
        return userService.getById(id);
    }
}
