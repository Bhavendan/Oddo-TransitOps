package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Driver;
import org.example.backend.entity.Trip;
import org.example.backend.entity.Vehicle;
import org.example.backend.enums.TripStatus;
import org.example.backend.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TripServiceImpl implements TripService {

    private final TripRepository tripRepository;

    @Override
    public Trip saveTrip(Trip trip) {
        return tripRepository.save(trip);
    }

    @Override
    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    @Override
    public Trip getTripById(Long tripId) {
        return tripRepository.findById(tripId)
                .orElseThrow(() ->
                        new RuntimeException("Trip not found with id: " + tripId));
    }

    @Override
    public Trip updateTrip(Long tripId, Trip trip) {

        Trip existingTrip = getTripById(tripId);

        existingTrip.setSource(trip.getSource());
        existingTrip.setDestination(trip.getDestination());
        existingTrip.setCargoWeight(trip.getCargoWeight());
        existingTrip.setPlannedDistance(trip.getPlannedDistance());
        existingTrip.setActualDistance(trip.getActualDistance());
        existingTrip.setFuelConsumed(trip.getFuelConsumed());
        existingTrip.setRevenue(trip.getRevenue());
        existingTrip.setStatus(trip.getStatus());
        existingTrip.setDispatchTime(trip.getDispatchTime());
        existingTrip.setCompletionTime(trip.getCompletionTime());
        existingTrip.setFinalOdometer(trip.getFinalOdometer());
        existingTrip.setVehicle(trip.getVehicle());
        existingTrip.setDriver(trip.getDriver());

        return tripRepository.save(existingTrip);
    }

    @Override
    public void deleteTrip(Long tripId) {

        Trip trip = getTripById(tripId);

        tripRepository.delete(trip);
    }

    @Override
    public List<Trip> getTripsByStatus(TripStatus status) {

        return tripRepository.findByStatus(status);
    }

    @Override
    public List<Trip> getTripsByVehicle(Vehicle vehicle) {

        return tripRepository.findByVehicle(vehicle);
    }

    @Override
    public List<Trip> getTripsByDriver(Driver driver) {

        return tripRepository.findByDriver(driver);
    }

    @Override
    public List<Trip> getTripsByVehicleAndStatus(
            Vehicle vehicle,
            TripStatus status) {

        return tripRepository.findByVehicleAndStatus(vehicle, status);
    }

    @Override
    public List<Trip> getTripsByDriverAndStatus(
            Driver driver,
            TripStatus status) {

        return tripRepository.findByDriverAndStatus(driver, status);
    }

    @Override
    public long countTripsByStatus(TripStatus status) {

        return tripRepository.countByStatus(status);
    }
}