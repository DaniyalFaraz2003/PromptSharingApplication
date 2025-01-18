package com.promptsharer.promptsharingapp.controller;

import com.promptsharer.promptsharingapp.entity.JournalEntry;
import com.promptsharer.promptsharingapp.service.JournalEntryService;
import com.promptsharer.promptsharingapp.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/journal")
public class JournalEntryController {
    @Autowired
    private JournalEntryService journalEntryService;
    @Autowired
    private UserService userService;

    @PostMapping("/{username}")
    public ResponseEntity<?> saveJournalEntry(@RequestBody JournalEntry journalEntry, @PathVariable String username) {
        journalEntry.setDate(LocalDateTime.now());
        journalEntryService.saveEntry(journalEntry, username);
        return ResponseEntity.ok("Journal Entry saved successfully");
    }

    @GetMapping("/user/{username}")
    public List<JournalEntry> getJournalEntriesByUser(@PathVariable String username) {
        return userService.findByUserName(username).getJournalEntries();
    }

    @GetMapping
    public List<JournalEntry> getAll() {
        return journalEntryService.getAll();
    }

    @GetMapping("/{id}")
    public JournalEntry getById(@PathVariable ObjectId id) {
        return journalEntryService.getById(id);
    }
}
