package com.promptsharer.promptsharingapp.controller;


import com.mongodb.MongoWriteException;
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
        try {
            userService.saveNewUser(user);
            return ResponseEntity.ok("Sign Up Successful. Log In to Continue");
        } catch (Exception e) {
            return new ResponseEntity<>("Username already exists", org.springframework.http.HttpStatus.BAD_REQUEST);
        }
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
        String currentSessionUser = (String) session.getAttribute("username");
        if (currentSessionUser == null) {
            return ResponseEntity.badRequest().body("User not logged in");
        }
        User user = userService.findByUserName(currentSessionUser);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        String currentSessionUser = (String) session.getAttribute("username");
        if (currentSessionUser == null) {
            return ResponseEntity.badRequest().body("User not logged in");
        }
        session.invalidate();
        return ResponseEntity.ok("Logout successful");
    }
}
