package org.example.backend.controller;



import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Driver;
import org.example.backend.entity.Trip;
import org.example.backend.entity.Vehicle;
import org.example.backend.enums.TripStatus;
import org.example.backend.service.TripService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@RequiredArgsConstructor

public class TripController {

    private final TripService tripService;

    @PostMapping
    public ResponseEntity<Trip> createTrip(@RequestBody Trip trip) {
        return new ResponseEntity<>(tripService.saveTrip(trip), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Trip>> getAllTrips() {
        return ResponseEntity.ok(tripService.getAllTrips());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trip> getTripById(@PathVariable Long id) {
        return ResponseEntity.ok(tripService.getTripById(id));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Trip>> getTripsByStatus(@PathVariable TripStatus status) {
        return ResponseEntity.ok(tripService.getTripsByStatus(status));
    }

    @GetMapping("/vehicle")
    public ResponseEntity<List<Trip>> getTripsByVehicle(@RequestBody Vehicle vehicle) {
        return ResponseEntity.ok(tripService.getTripsByVehicle(vehicle));
    }

    @GetMapping("/driver")
    public ResponseEntity<List<Trip>> getTripsByDriver(@RequestBody Driver driver) {
        return ResponseEntity.ok(tripService.getTripsByDriver(driver));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trip> updateTrip(
            @PathVariable Long id,
            @RequestBody Trip trip) {
        return ResponseEntity.ok(tripService.updateTrip(id, trip));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable Long id) {
        tripService.deleteTrip(id);
        return ResponseEntity.noContent().build();
    }
}
