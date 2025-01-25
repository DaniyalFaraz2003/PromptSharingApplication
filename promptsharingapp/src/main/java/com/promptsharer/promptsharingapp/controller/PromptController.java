package com.promptsharer.promptsharingapp.controller;


import com.promptsharer.promptsharingapp.entity.Prompt;
import com.promptsharer.promptsharingapp.entity.User;
import com.promptsharer.promptsharingapp.service.PromptService;
import com.promptsharer.promptsharingapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/prompt")
@RestController
public class PromptController {

    @Autowired
    private PromptService promptService;

    @Autowired
    private UserService userService;

    @PostMapping("/save-prompt")
    public ResponseEntity<?> savePrompt(@RequestBody Prompt prompt) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.findByUserName(username);
        prompt.setAuthor(user);
        promptService.saveNewPrompt(prompt);
        return ResponseEntity.ok("Prompt saved successfully");
    }

    
}
