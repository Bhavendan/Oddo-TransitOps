package org.example.backend.repository;


import org.example.backend.entity.Driver;
import org.example.backend.entity.Trip;
import org.example.backend.entity.Vehicle;
import org.example.backend.enums.TripStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {

    List<Trip> findByStatus(TripStatus status);

    List<Trip> findByVehicle(Vehicle vehicle);

    List<Trip> findByDriver(Driver driver);

    List<Trip> findByVehicleAndStatus(Vehicle vehicle, TripStatus status);

    List<Trip> findByDriverAndStatus(Driver driver, TripStatus status);

    long countByStatus(TripStatus status);
}
