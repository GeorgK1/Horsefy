package com.georgkivivali.horsefy.controller;

import com.georgkivivali.horsefy.model.horse.Horse;
import com.georgkivivali.horsefy.model.horserace.HorseRace;
import com.georgkivivali.horsefy.service.HorsefyService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/horsefy")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class HorsefyController {

    private final HorsefyService horsefyService;


    @GetMapping("/allraces")
    public List<HorseRace> fetchAllHorseRaces() {
        return horsefyService.getAllHorseRaces();
    }

    @PostMapping("/newrace")
    public void registerNewHorseRace(@RequestBody HorseRace horseRace) {

        horsefyService.addNewHorseRace(horseRace);
    }

    @PostMapping("/startracing")
    public void startRace(@RequestBody HorseRace horseRace) {
        horsefyService.startHorseRace(horseRace);
    }

    @GetMapping("/horse")
    public List<Horse> fetchAllHorses() {return horsefyService.getAllHorses();}

    @PostMapping("/horse")
    public void registerNewHorse(@RequestBody Horse horse) {
        horsefyService.addNewHorse(horse);
    }

}
