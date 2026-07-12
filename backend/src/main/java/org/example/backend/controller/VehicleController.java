package org.example.backend.controller;



import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Vehicle;
import org.example.backend.enums.VehicleStatus;
import org.example.backend.service.VehicleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor

public class VehicleController {

    private final VehicleService vehicleService;

    @PostMapping
    public ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicle) {
        return new ResponseEntity<>(
                vehicleService.saveVehicle(vehicle),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<Vehicle>> getAllVehicles() {
        return ResponseEntity.ok(vehicleService.getAllVehicles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long id) {
        return ResponseEntity.ok(vehicleService.getVehicleById(id));
    }

    @GetMapping("/registration/{registrationNumber}")
    public ResponseEntity<Vehicle> getVehicleByRegistrationNumber(
            @PathVariable String registrationNumber
    ) {
        return ResponseEntity.ok(
                vehicleService.getVehicleByRegistrationNumber(registrationNumber)
        );
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Vehicle>> getVehiclesByStatus(
            @PathVariable VehicleStatus status
    ) {
        return ResponseEntity.ok(
                vehicleService.getVehiclesByStatus(status)
        );
    }

    @GetMapping("/region/{region}")
    public ResponseEntity<List<Vehicle>> getVehiclesByRegion(
            @PathVariable String region
    ) {
        return ResponseEntity.ok(
                vehicleService.getVehiclesByRegion(region)
        );
    }

    @GetMapping("/type/{vehicleType}")
    public ResponseEntity<List<Vehicle>> getVehiclesByType(
            @PathVariable String vehicleType
    ) {
        return ResponseEntity.ok(
                vehicleService.getVehiclesByType(vehicleType)
        );
    }

    @GetMapping("/count/status/{status}")
    public ResponseEntity<Long> countVehiclesByStatus(
            @PathVariable VehicleStatus status
    ) {
        return ResponseEntity.ok(
                vehicleService.countVehiclesByStatus(status)
        );
    }

    @GetMapping("/count/type/{vehicleType}")
    public ResponseEntity<Long> countVehiclesByType(
            @PathVariable String vehicleType
    ) {
        return ResponseEntity.ok(
                vehicleService.countVehiclesByType(vehicleType)
        );
    }

    @GetMapping("/count/region/{region}")
    public ResponseEntity<Long> countVehiclesByRegion(
            @PathVariable String region
    ) {
        return ResponseEntity.ok(
                vehicleService.countVehiclesByRegion(region)
        );
    }

    @GetMapping("/exists/{registrationNumber}")
    public ResponseEntity<Boolean> existsByRegistrationNumber(
            @PathVariable String registrationNumber
    ) {
        return ResponseEntity.ok(
                vehicleService.existsByRegistrationNumber(registrationNumber)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> updateVehicle(
            @PathVariable Long id,
            @RequestBody Vehicle vehicle
    ) {
        return ResponseEntity.ok(
                vehicleService.updateVehicle(id, vehicle)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(
            @PathVariable Long id
    ) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.noContent().build();
    }

}