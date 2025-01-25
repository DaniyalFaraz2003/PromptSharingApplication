package com.promptsharer.promptsharingapp.service;

import com.promptsharer.promptsharingapp.entity.Prompt;
import com.promptsharer.promptsharingapp.entity.User;
import com.promptsharer.promptsharingapp.repository.PromptRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class PromptService  {

    @Autowired
    private PromptRepository promptRepository;

    public void saveNewPrompt(Prompt prompt) {
        promptRepository.save(prompt);
    }

    public List<Prompt> getAllPrompts() {
        return promptRepository.findAll();
    }

    public List<Prompt> getPromptsByAuthor(User author) {
        return promptRepository.findByAuthor(author);
    }

    public void deletePrompt(ObjectId id) {
        promptRepository.deleteById(id);
    }

}
