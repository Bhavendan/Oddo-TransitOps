package org.example.backend.repository;



import org.example.backend.entity.Vehicle;
import org.example.backend.enums.VehicleStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    Optional<Vehicle> findByRegistrationNumber(String registrationNumber);

    boolean existsByRegistrationNumber(String registrationNumber);

    List<Vehicle> findByStatus(VehicleStatus status);

    List<Vehicle> findByRegion(String region);

    List<Vehicle> findByVehicleType(String vehicleType);

    long countByStatus(VehicleStatus status);

    long countByVehicleType(String vehicleType);

    long countByRegion(String region);

}
