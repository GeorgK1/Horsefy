package com.georgkivivali.horsefy.model.horse;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//Horse model


@Data
@Document
public class Horse {
    @Id
    private String id;

    private String name;
    private String color;

    public Horse(String name, String color) {
        this.name = name;
        this.color = color;
    }
}
