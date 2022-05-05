package com.georgkivivali.horsefy.repository;

import com.georgkivivali.horsefy.model.horserace.HorseRace;
import org.springframework.data.mongodb.repository.MongoRepository;


/**
 * Interface that "speaks" with the Mongodb instance
 **/
public interface HorseRaceRepository extends MongoRepository<HorseRace, String> {
    HorseRace findHorseRaceById(String id);
}
