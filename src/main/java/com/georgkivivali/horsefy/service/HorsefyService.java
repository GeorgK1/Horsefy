package com.georgkivivali.horsefy.service;

import com.georgkivivali.horsefy.model.horse.Horse;
import com.georgkivivali.horsefy.model.horserace.HorseRace;
import com.georgkivivali.horsefy.model.raceresult.RaceResult;
import com.georgkivivali.horsefy.repository.HorseRaceRepository;
import com.georgkivivali.horsefy.repository.HorseRepository;
import com.georgkivivali.horsefy.repository.RaceResultRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Random;

@AllArgsConstructor
@Service
public class HorsefyService {
    private final HorseRaceRepository horseRaceRepository;
    private final RaceResultRepository raceResultRepository;
    private final HorseRepository horseRepository;

    public List<HorseRace> getAllHorseRaces() {
        return horseRaceRepository.findAll();
    }

    public void addNewHorseRace(HorseRace horseRace) {
        horseRaceRepository.save(horseRace);
    }

    public void startHorseRace(HorseRace horseRace) {
        List<Horse> participants = horseRace.getParticipants();
        RaceResult result;
        Collections.shuffle(participants);
        //getting a random horse from the participants list
        Horse winner = participants.get(new Random().nextInt(participants.size()));

        //saving the result
        if (winner.getName() == horseRace.getBet()) {
            result = new RaceResult(true, horseRace.getBet(), winner.getName());
        } else {
            result = new RaceResult(false, horseRace.getBet(), winner.getName());
        }

        raceResultRepository.save(result);
    }

    public void addNewHorse(Horse horse) {
        horseRepository.findByName(horse.getName())
                .ifPresentOrElse(s -> {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Horse with this name already exists!");
                }, () -> {
                    horseRepository.save(horse);
                });

    }

    public List<Horse> getAllHorses() {
        return horseRepository.findAll();
    }
}
