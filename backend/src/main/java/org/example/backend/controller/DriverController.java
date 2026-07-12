package org.example.backend.controller;



import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Driver;
import org.example.backend.enums.DriverStatus;
import org.example.backend.service.DriverService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/drivers")
@RequiredArgsConstructor

public class DriverController {

    private final DriverService driverService;

    @PostMapping("/test")
    public ResponseEntity<String> test(@RequestBody String body) {
        return ResponseEntity.ok(body);
    }

    @PostMapping
    public ResponseEntity<Driver> createDriver(@RequestBody Driver driver) {
        return new ResponseEntity<>(driverService.saveDriver(driver), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Driver>> getAllDrivers() {
        return ResponseEntity.ok(driverService.getAllDrivers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Driver> getDriverById(@PathVariable Long id) {
        return ResponseEntity.ok(driverService.getDriverById(id));
    }

    @GetMapping("/license/{licenseNumber}")
    public ResponseEntity<Driver> getDriverByLicense(@PathVariable String licenseNumber) {
        return ResponseEntity.ok(driverService.getDriverByLicenseNumber(licenseNumber));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Driver>> getDriversByStatus(@PathVariable DriverStatus status) {
        return ResponseEntity.ok(driverService.getDriversByStatus(status));
    }

    @GetMapping("/expired/{date}")
    public ResponseEntity<List<Driver>> getExpiredDrivers(@PathVariable LocalDate date) {
        return ResponseEntity.ok(driverService.getExpiredLicenses(date));
    }

    @GetMapping("/count/{status}")
    public ResponseEntity<Long> countDrivers(@PathVariable DriverStatus status) {
        return ResponseEntity.ok(driverService.countDriversByStatus(status));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Driver> updateDriver(
            @PathVariable Long id,
            @RequestBody Driver driver) {
        return ResponseEntity.ok(driverService.updateDriver(id, driver));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDriver(@PathVariable Long id) {
        driverService.deleteDriver(id);
        return ResponseEntity.noContent().build();
    }
}
