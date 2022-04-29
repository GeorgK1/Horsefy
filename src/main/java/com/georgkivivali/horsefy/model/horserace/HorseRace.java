package com.georgkivivali.horsefy.model.horserace;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.georgkivivali.horsefy.model.horse.Horse;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
//Model for the horse races themselves
@Data
@Document
public class HorseRace {
    @Id
    private String id;
    private String place;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date time;
    private List<Horse> participants;
    //horse, which the user bet on
    private String bet;
}
