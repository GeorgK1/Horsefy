package com.georgkivivali.horsefy.repository;

import com.georgkivivali.horsefy.model.horserace.HorseRace;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Interface that "speaks" with the Mongodb instance
 **/
public interface HorseRaceRepository extends MongoRepository<HorseRace, String> {
    List<HorseRace> findHorseRaceByTime(HorseRace horseRace);
}
