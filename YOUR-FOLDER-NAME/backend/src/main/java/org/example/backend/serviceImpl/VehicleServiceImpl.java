package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Vehicle;
import org.example.backend.enums.VehicleStatus;
import org.example.backend.repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository vehicleRepository;

    @Override
    public Vehicle saveVehicle(Vehicle vehicle) {

        if (vehicleRepository.existsByRegistrationNumber(vehicle.getRegistrationNumber())) {
            throw new RuntimeException("Vehicle with this registration number already exists.");
        }

        return vehicleRepository.save(vehicle);
    }

    @Override
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    @Override
    public Vehicle getVehicleById(Long vehicleId) {

        return vehicleRepository.findById(vehicleId)
                .orElseThrow(() ->
                        new RuntimeException("Vehicle not found with id: " + vehicleId));
    }

    @Override
    public Vehicle updateVehicle(Long vehicleId, Vehicle vehicle) {

        Vehicle existingVehicle = getVehicleById(vehicleId);

        existingVehicle.setRegistrationNumber(vehicle.getRegistrationNumber());
        existingVehicle.setVehicleName(vehicle.getVehicleName());
        existingVehicle.setVehicleModel(vehicle.getVehicleModel());
        existingVehicle.setVehicleType(vehicle.getVehicleType());
        existingVehicle.setMaximumLoadCapacity(vehicle.getMaximumLoadCapacity());
        existingVehicle.setCurrentOdometer(vehicle.getCurrentOdometer());
        existingVehicle.setAcquisitionCost(vehicle.getAcquisitionCost());
        existingVehicle.setStatus(vehicle.getStatus());
        existingVehicle.setRegion(vehicle.getRegion());

        return vehicleRepository.save(existingVehicle);
    }

    @Override
    public void deleteVehicle(Long vehicleId) {

        Vehicle vehicle = getVehicleById(vehicleId);

        vehicleRepository.delete(vehicle);
    }

    @Override
    public Vehicle getVehicleByRegistrationNumber(String registrationNumber) {

        return vehicleRepository.findByRegistrationNumber(registrationNumber)
                .orElseThrow(() ->
                        new RuntimeException("Vehicle not found with registration number: "
                                + registrationNumber));
    }

    @Override
    public boolean existsByRegistrationNumber(String registrationNumber) {

        return vehicleRepository.existsByRegistrationNumber(registrationNumber);
    }

    @Override
    public List<Vehicle> getVehiclesByStatus(VehicleStatus status) {

        return vehicleRepository.findByStatus(status);
    }

    @Override
    public List<Vehicle> getVehiclesByRegion(String region) {

        return vehicleRepository.findByRegion(region);
    }

    @Override
    public List<Vehicle> getVehiclesByType(String vehicleType) {

        return vehicleRepository.findByVehicleType(vehicleType);
    }

    @Override
    public long countVehiclesByStatus(VehicleStatus status) {

        return vehicleRepository.countByStatus(status);
    }

    @Override
    public long countVehiclesByType(String vehicleType) {

        return vehicleRepository.countByVehicleType(vehicleType);
    }

    @Override
    public long countVehiclesByRegion(String region) {

        return vehicleRepository.countByRegion(region);
    }
}