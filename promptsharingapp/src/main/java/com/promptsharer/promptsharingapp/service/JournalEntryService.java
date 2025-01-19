package com.promptsharer.promptsharingapp.service;

import com.promptsharer.promptsharingapp.entity.JournalEntry;
import com.promptsharer.promptsharingapp.entity.User;
import com.promptsharer.promptsharingapp.repository.JournalEntryRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class JournalEntryService {

    @Autowired
    private JournalEntryRepository journalEntryRepository;

    @Autowired
    private UserService userService;

    @Transactional
    public void saveEntry(JournalEntry entry, String username) {
        User user = userService.findByUserName(username);
        entry.setDate(LocalDateTime.now());
        JournalEntry saved = journalEntryRepository.save(entry);
        user.getJournalEntries().add(saved);
        userService.saveEntry(user);
    }

    public List<JournalEntry> getAll() {
        return journalEntryRepository.findAll();
    }

    public JournalEntry getById(ObjectId id) {
        return journalEntryRepository.findById(id).orElse(null);
    }
}
