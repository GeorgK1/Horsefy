package com.georgkivivali.horsefy.repository;

import com.georgkivivali.horsefy.model.horse.Horse;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface HorseRepository extends MongoRepository<Horse, String> {
    Optional<Horse> findByName(String name);
}
