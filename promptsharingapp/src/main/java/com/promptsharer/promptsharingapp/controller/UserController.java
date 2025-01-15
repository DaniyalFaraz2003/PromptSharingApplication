package com.promptsharer.promptsharingapp.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {
    // Build add user REST API
    // Build get user by id REST API
    // Build get all users REST API
    // Build update user REST API
    // Build delete user REST AP

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        return new ResponseEntity<>("Test not found API", HttpStatus.NOT_FOUND);
    }
}
