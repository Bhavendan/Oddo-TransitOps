package org.example.backend.service;

import org.example.backend.entity.Driver;
import org.example.backend.entity.Trip;
import org.example.backend.entity.Vehicle;
import org.example.backend.enums.TripStatus;

import java.util.List;

public interface TripService {

    Trip saveTrip(Trip trip);

    List<Trip> getAllTrips();

    Trip getTripById(Long tripId);

    Trip updateTrip(Long tripId, Trip trip);

    void deleteTrip(Long tripId);

    List<Trip> getTripsByStatus(TripStatus status);

    List<Trip> getTripsByVehicle(Vehicle vehicle);

    List<Trip> getTripsByDriver(Driver driver);

    List<Trip> getTripsByVehicleAndStatus(Vehicle vehicle, TripStatus status);

    List<Trip> getTripsByDriverAndStatus(Driver driver, TripStatus status);

    long countTripsByStatus(TripStatus status);
}