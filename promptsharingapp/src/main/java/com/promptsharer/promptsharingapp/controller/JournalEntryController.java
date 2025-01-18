package com.promptsharer.promptsharingapp.controller;

import com.promptsharer.promptsharingapp.entity.JournalEntry;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/journal")
public class JournalEntryController {
    private Map<Long, JournalEntry> journalEntries = new HashMap<Long, JournalEntry>();

    @GetMapping
    public ArrayList<JournalEntry> getAll() {
        return new ArrayList<>(journalEntries.values());
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestBody JournalEntry journalEntry) {
        journalEntries.put(journalEntry.getId(), journalEntry);
        return new ResponseEntity<>("ok", null, 201);
    }
}
