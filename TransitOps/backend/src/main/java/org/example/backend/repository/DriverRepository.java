package org.example.backend.repository;




import org.example.backend.entity.Driver;
import org.example.backend.enums.DriverStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DriverRepository extends JpaRepository<Driver, Long> {

    Optional<Driver> findByLicenseNumber(String licenseNumber);

    boolean existsByLicenseNumber(String licenseNumber);

    List<Driver> findByStatus(DriverStatus status);

    List<Driver> findByLicenseExpiryDateBefore(LocalDate date);

    long countByStatus(DriverStatus status);

}
