package com.georgkivivali.horsefy.controller;

import com.georgkivivali.horsefy.model.horse.Horse;
import com.georgkivivali.horsefy.model.horserace.HorseRace;
import com.georgkivivali.horsefy.model.raceresult.RaceResult;
import com.georgkivivali.horsefy.service.HorsefyService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/horsefy")
@AllArgsConstructor

public class HorsefyController {

    private final HorsefyService horsefyService;


    @GetMapping("/races")
    public List<HorseRace> fetchAllHorseRaces() {
        return horsefyService.getAllHorseRaces();
    }

    @PostMapping("/races")
    public void registerNewHorseRace(@RequestBody HorseRace horseRace) {
        horsefyService.addNewHorseRace(horseRace);
    }

    @PostMapping("/races/start")
    public RaceResult startRace(@RequestParam String raceId) {
        return horsefyService.startHorseRace(raceId);
    }

    @GetMapping("/races/results")
    public List<RaceResult> fetchAllRaceResults() {
        return horsefyService.getAllRaceResults();
    }

    @GetMapping("/races/results/{id}")
    public RaceResult fetchResultById(@PathVariable("id") String raceId) {
        return horsefyService.getResultById(raceId);
    }

    @GetMapping("/horses")
    public List<Horse> fetchAllHorses() {
        return horsefyService.getAllHorses();
    }

    @PostMapping("/horses")
    public void registerNewHorse(@RequestBody Horse horse) {
        horsefyService.addNewHorse(horse);
    }


}
