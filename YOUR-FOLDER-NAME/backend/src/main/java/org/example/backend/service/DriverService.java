package org.example.backend.service;

import org.example.backend.entity.Driver;
import org.example.backend.enums.DriverStatus;

import java.time.LocalDate;
import java.util.List;

public interface DriverService {

    Driver saveDriver(Driver driver);

    List<Driver> getAllDrivers();

    Driver getDriverById(Long driverId);

    Driver updateDriver(Long driverId, Driver driver);

    void deleteDriver(Long driverId);

    Driver getDriverByLicenseNumber(String licenseNumber);

    List<Driver> getDriversByStatus(DriverStatus status);

    List<Driver> getExpiredLicenses(LocalDate date);

    long countDriversByStatus(DriverStatus status);
}