package org.example.backend.repository;


import org.example.backend.entity.FuelLog;
import org.example.backend.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface FuelLogRepository extends JpaRepository<FuelLog, Long> {

    List<FuelLog> findByVehicle(Vehicle vehicle);

    List<FuelLog> findByFuelDateBetween(LocalDate start, LocalDate end);

    @Query("""
            SELECT COALESCE(SUM(f.cost),0)
            FROM FuelLog f
            WHERE f.vehicle.vehicleId = :vehicleId
            """)
    BigDecimal getTotalFuelCost(Long vehicleId);


}
