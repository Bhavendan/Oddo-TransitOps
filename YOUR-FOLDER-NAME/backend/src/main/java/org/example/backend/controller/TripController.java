package org.example.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Driver;
import org.example.backend.entity.Trip;
import org.example.backend.entity.Vehicle;
import org.example.backend.enums.TripStatus;
import org.example.backend.service.DriverService;
import org.example.backend.service.TripService;
import org.example.backend.service.VehicleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@RequiredArgsConstructor
@CrossOrigin
public class TripController {

    private final TripService tripService;
    private final VehicleService vehicleService;
    private final DriverService driverService;

    @GetMapping
    public List<Trip> getAll(
            @RequestParam(required = false) TripStatus status,
            @RequestParam(required = false) Long vehicleId,
            @RequestParam(required = false) Long driverId
    ) {
        if (vehicleId != null) {
            Vehicle vehicle = vehicleService.getVehicleById(vehicleId);
            return status != null
                    ? tripService.getTripsByVehicleAndStatus(vehicle, status)
                    : tripService.getTripsByVehicle(vehicle);
        }
        if (driverId != null) {
            Driver driver = driverService.getDriverById(driverId);
            return status != null
                    ? tripService.getTripsByDriverAndStatus(driver, status)
                    : tripService.getTripsByDriver(driver);
        }
        if (status != null) return tripService.getTripsByStatus(status);
        return tripService.getAllTrips();
    }

    @GetMapping("/{id}")
    public Trip getById(@PathVariable Long id) {
        return tripService.getTripById(id);
    }

    @GetMapping("/stats/count-by-status")
    public Object countByStatus() {
        return java.util.Arrays.stream(TripStatus.values())
                .collect(java.util.stream.Collectors.toMap(s -> s, tripService::countTripsByStatus));
    }

    @PostMapping
    public Trip create(@Valid @RequestBody Trip trip) {
        return tripService.saveTrip(trip);
    }

    @PutMapping("/{id}")
    public Trip update(@PathVariable Long id, @Valid @RequestBody Trip trip) {
        return tripService.updateTrip(id, trip);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        tripService.deleteTrip(id);
    }
}
