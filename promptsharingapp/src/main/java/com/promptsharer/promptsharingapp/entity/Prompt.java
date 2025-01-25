package com.promptsharer.promptsharingapp.entity;


import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "prompts")
@Data
public class Prompt {

    @Id
    private ObjectId id;

    private String title;
    private String content;
    private List<String> tags;

    @DBRef
    private User author;
}
