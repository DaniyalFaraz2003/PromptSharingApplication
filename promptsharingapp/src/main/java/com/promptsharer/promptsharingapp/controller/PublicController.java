package com.promptsharer.promptsharingapp.controller;


import com.mongodb.MongoWriteException;
import com.promptsharer.promptsharingapp.entity.Prompt;
import com.promptsharer.promptsharingapp.entity.User;
import com.promptsharer.promptsharingapp.service.PromptService;
import com.promptsharer.promptsharingapp.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/public")
public class PublicController {

    @Autowired
    private UserService userService;

    @Autowired
    private PromptService promptService;

    @PostMapping("create-user")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            userService.saveNewUser(user);
            return ResponseEntity.ok("Sign Up Successful. Log In to Continue");
        } catch (Exception e) {
            return new ResponseEntity<>("Username already exists", org.springframework.http.HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Prompt>> getAllPrompts() {
        return ResponseEntity.ok(promptService.getAllPrompts());
    }

    @GetMapping("/login")
    public ResponseEntity<?> login(HttpSession session) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return ResponseEntity.ok("Login successful");
    }



}
