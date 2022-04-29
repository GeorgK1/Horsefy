package com.georgkivivali.horsefy.model.horse;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

//Horse model

@AllArgsConstructor
@Data
@Document
public class Horse {
    @Indexed(unique = true)
    private String name;
    private String color;
}
