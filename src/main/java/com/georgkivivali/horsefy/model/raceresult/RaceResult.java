package com.georgkivivali.horsefy.model.raceresult;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "raceResult")
public class RaceResult {
    @Id
    private String id;
    private Boolean win;
    private String bet;
    private String winner;

    public RaceResult(Boolean win, String bet, String winner) {
        this.win = win;
        this.bet = bet;
        this.winner = winner;
    }
}
