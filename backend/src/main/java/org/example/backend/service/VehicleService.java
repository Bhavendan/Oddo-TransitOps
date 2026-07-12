package org.example.backend.service;

import org.example.backend.entity.Vehicle;
import org.example.backend.enums.VehicleStatus;

import java.util.List;

public interface VehicleService {

    Vehicle saveVehicle(Vehicle vehicle);

    List<Vehicle> getAllVehicles();

    Vehicle getVehicleById(Long vehicleId);

    Vehicle updateVehicle(Long vehicleId, Vehicle vehicle);

    void deleteVehicle(Long vehicleId);

    Vehicle getVehicleByRegistrationNumber(String registrationNumber);

    boolean existsByRegistrationNumber(String registrationNumber);

    List<Vehicle> getVehiclesByStatus(VehicleStatus status);

    List<Vehicle> getVehiclesByRegion(String region);

    List<Vehicle> getVehiclesByType(String vehicleType);

    long countVehiclesByStatus(VehicleStatus status);

    long countVehiclesByType(String vehicleType);

    long countVehiclesByRegion(String region);
}