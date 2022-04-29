package com.georgkivivali.horsefy.repository;

import com.georgkivivali.horsefy.model.raceresult.RaceResult;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RaceResultRepository extends MongoRepository<RaceResult, String> {
}
