package org.example.backend.repository;




import org.example.backend.entity.MaintenanceLog;
import org.example.backend.entity.Vehicle;
import org.example.backend.enums.MaintenanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface MaintenanceLogRepository extends JpaRepository<MaintenanceLog, Long> {
    List<MaintenanceLog> findByVehicle(Vehicle vehicle);

    List<MaintenanceLog> findByStatus(MaintenanceStatus status);

    List<MaintenanceLog> findByVehicleAndStatus(
            Vehicle vehicle,
            MaintenanceStatus status
    );

    long countByStatus(MaintenanceStatus status);
    @Query("""
       SELECT COALESCE(SUM(m.cost),0)
       FROM MaintenanceLog m
       WHERE m.vehicle.vehicleId=:vehicleId
       """)
    BigDecimal getTotalMaintenanceCost(Long vehicleId);


}
