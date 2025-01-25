package com.promptsharer.promptsharingapp.repository;

import com.promptsharer.promptsharingapp.entity.Prompt;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PromptRepository extends MongoRepository<Prompt, ObjectId> {

}
