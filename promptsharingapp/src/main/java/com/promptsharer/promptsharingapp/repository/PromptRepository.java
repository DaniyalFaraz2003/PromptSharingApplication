package com.promptsharer.promptsharingapp.repository;

import com.promptsharer.promptsharingapp.entity.Prompt;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PromptRepository extends MongoRepository<Prompt, ObjectId> {
    List<Prompt> getPromptByAuthor_Username(String username);
}
