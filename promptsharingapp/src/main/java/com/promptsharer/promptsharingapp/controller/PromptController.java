package com.promptsharer.promptsharingapp.controller;


import com.promptsharer.promptsharingapp.entity.Prompt;
import com.promptsharer.promptsharingapp.entity.User;
import com.promptsharer.promptsharingapp.service.PromptService;
import com.promptsharer.promptsharingapp.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/prompt")
@RestController
public class PromptController {

    @Autowired
    private PromptService promptService;

    @Autowired
    private UserService userService;

    @PostMapping("/save")
    public ResponseEntity<?> savePrompt(@RequestBody Prompt prompt) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.findByUserName(username);
        prompt.setAuthor(user);
        promptService.saveNewPrompt(prompt);
        return ResponseEntity.ok("Prompt saved successfully");
    }


    @GetMapping("/author/{username}")
    public ResponseEntity<List<Prompt>> findByUsername(@PathVariable String username) {
        User author = userService.findByUserName(username);
        return ResponseEntity.ok(promptService.getPromptsByAuthor(author));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePrompt(@PathVariable ObjectId id) {
        promptService.deletePrompt(id);
        return ResponseEntity.ok("Prompt Deleted Successfully");
    }
}
