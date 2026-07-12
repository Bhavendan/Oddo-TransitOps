package org.example.backend.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Driver;
import org.example.backend.enums.DriverStatus;
import org.example.backend.repository.DriverRepository;
import org.example.backend.service.DriverService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DriverServiceImpl implements DriverService {

    private final DriverRepository driverRepository;

    @Override
    public Driver saveDriver(Driver driver) {

        if (driverRepository.existsByLicenseNumber(driver.getLicenseNumber())) {
            throw new RuntimeException("License number already exists.");
        }

        return driverRepository.save(driver);
    }

    @Override
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    @Override
    public Driver getDriverById(Long driverId) {
        return driverRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found with id : " + driverId));
    }

    @Override
    public Driver updateDriver(Long driverId, Driver driver) {

        Driver existingDriver = getDriverById(driverId);

        existingDriver.setName(driver.getName());
        existingDriver.setLicenseNumber(driver.getLicenseNumber());
        existingDriver.setLicenseCategory(driver.getLicenseCategory());
        existingDriver.setLicenseExpiryDate(driver.getLicenseExpiryDate());
        existingDriver.setContactNumber(driver.getContactNumber());
        existingDriver.setSafetyScore(driver.getSafetyScore());
        existingDriver.setStatus(driver.getStatus());

        return driverRepository.save(existingDriver);
    }

    @Override
    public void deleteDriver(Long driverId) {

        Driver driver = getDriverById(driverId);

        driverRepository.delete(driver);
    }

    @Override
    public Driver getDriverByLicenseNumber(String licenseNumber) {

        return driverRepository.findByLicenseNumber(licenseNumber)
                .orElseThrow(() -> new RuntimeException("Driver not found."));
    }

    @Override
    public List<Driver> getDriversByStatus(DriverStatus status) {

        return driverRepository.findByStatus(status);
    }

    @Override
    public List<Driver> getExpiredLicenses(LocalDate date) {

        return driverRepository.findByLicenseExpiryDateBefore(date);
    }

    @Override
    public long countDriversByStatus(DriverStatus status) {

        return driverRepository.countByStatus(status);
    }
}