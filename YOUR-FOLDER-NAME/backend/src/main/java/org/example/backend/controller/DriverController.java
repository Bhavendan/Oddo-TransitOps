package org.example.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Driver;
import org.example.backend.enums.DriverStatus;
import org.example.backend.service.DriverService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/drivers")
@RequiredArgsConstructor
@CrossOrigin
public class DriverController {

    private final DriverService driverService;

    @GetMapping
    public List<Driver> getAll(@RequestParam(required = false) DriverStatus status) {
        if (status != null) return driverService.getDriversByStatus(status);
        return driverService.getAllDrivers();
    }

    @GetMapping("/{id}")
    public Driver getById(@PathVariable Long id) {
        return driverService.getDriverById(id);
    }

    @GetMapping("/license/{licenseNumber}")
    public Driver getByLicense(@PathVariable String licenseNumber) {
        return driverService.getDriverByLicenseNumber(licenseNumber);
    }

    @GetMapping("/expiring-licenses")
    public List<Driver> getExpiringLicenses(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate before
    ) {
        return driverService.getExpiredLicenses(before);
    }

    @PostMapping
    public Driver create(@Valid @RequestBody Driver driver) {
        return driverService.saveDriver(driver);
    }

    @PutMapping("/{id}")
    public Driver update(@PathVariable Long id, @Valid @RequestBody Driver driver) {
        return driverService.updateDriver(id, driver);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        driverService.deleteDriver(id);
    }
}
