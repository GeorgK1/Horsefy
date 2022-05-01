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
@Document(collection = "horseRace")
public class HorseRace {
    @Id
    private String id;

    private String place;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date date;
    private List<Horse> horses;
    //horse, which the user bet on
    private String bet;

    public HorseRace(String place, Date date, List<Horse> horses, String bet) {
        this.place = place;
        this.date = date;
        this.horses = horses;
        this.bet = bet;
    }
}
