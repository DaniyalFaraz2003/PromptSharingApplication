package com.promptsharer.promptsharingapp.controller;


import com.promptsharer.promptsharingapp.entity.User;
import com.promptsharer.promptsharingapp.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/public")
public class PublicController {

    @Autowired
    private UserService userService;

    @PostMapping("create-user")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        userService.saveNewUser(user);
        return ResponseEntity.ok("User created successfully");
    }

    @GetMapping("/login")
    public ResponseEntity<?> login(HttpSession session) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        session.setAttribute("username", username);
        return ResponseEntity.ok("Login successful");
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(HttpSession session) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        String currentSessionUser = (String) session.getAttribute("username");
        if (currentSessionUser == null || !currentSessionUser.equals(username)) {
            return ResponseEntity.badRequest().body("User not logged in");
        }
        User user = userService.findByUserName(username);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        String currentSessionUser = (String) session.getAttribute("username");
        if (currentSessionUser == null || !currentSessionUser.equals(username)) {
            return ResponseEntity.badRequest().body("User not logged in");
        }
        session.invalidate();
        return ResponseEntity.ok("Logout successful");
    }
}
