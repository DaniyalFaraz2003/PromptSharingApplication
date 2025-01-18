package com.promptsharer.promptsharingapp.controller;

import com.promptsharer.promptsharingapp.entity.JournalEntry;
import com.promptsharer.promptsharingapp.service.JournalEntryService;
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

    @PostMapping
    public ResponseEntity<?> saveJournalEntry(@RequestBody JournalEntry journalEntry) {
        journalEntry.setDate(LocalDateTime.now());
        journalEntryService.saveEntry(journalEntry);
        return ResponseEntity.ok("Journal Entry saved successfully");
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
