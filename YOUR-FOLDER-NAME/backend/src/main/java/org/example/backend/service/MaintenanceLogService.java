package org.example.backend.service;

import org.example.backend.entity.MaintenanceLog;
import org.example.backend.entity.Vehicle;
import org.example.backend.enums.MaintenanceStatus;

import java.math.BigDecimal;
import java.util.List;

public interface MaintenanceLogService {

    MaintenanceLog saveMaintenanceLog(MaintenanceLog maintenanceLog);

    List<MaintenanceLog> getAllMaintenanceLogs();

    MaintenanceLog getMaintenanceLogById(Long maintenanceId);

    MaintenanceLog updateMaintenanceLog(Long maintenanceId, MaintenanceLog maintenanceLog);

    void deleteMaintenanceLog(Long maintenanceId);

    List<MaintenanceLog> getMaintenanceLogsByVehicle(Vehicle vehicle);

    List<MaintenanceLog> getMaintenanceLogsByStatus(MaintenanceStatus status);

    List<MaintenanceLog> getMaintenanceLogsByVehicleAndStatus(
            Vehicle vehicle,
            MaintenanceStatus status
    );

    long countMaintenanceByStatus(MaintenanceStatus status);

    BigDecimal getTotalMaintenanceCost(Long vehicleId);
}