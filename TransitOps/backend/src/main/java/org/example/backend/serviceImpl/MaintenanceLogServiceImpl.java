package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.entity.MaintenanceLog;
import org.example.backend.entity.Vehicle;
import org.example.backend.enums.MaintenanceStatus;
import org.example.backend.repository.MaintenanceLogRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MaintenanceLogServiceImpl implements MaintenanceLogService {

    private final MaintenanceLogRepository maintenanceLogRepository;

    @Override
    public MaintenanceLog saveMaintenanceLog(MaintenanceLog maintenanceLog) {
        return maintenanceLogRepository.save(maintenanceLog);
    }

    @Override
    public List<MaintenanceLog> getAllMaintenanceLogs() {
        return maintenanceLogRepository.findAll();
    }

    @Override
    public MaintenanceLog getMaintenanceLogById(Long maintenanceId) {
        return maintenanceLogRepository.findById(maintenanceId)
                .orElseThrow(() ->
                        new RuntimeException("Maintenance Log not found with id: " + maintenanceId));
    }

    @Override
    public MaintenanceLog updateMaintenanceLog(Long maintenanceId, MaintenanceLog maintenanceLog) {

        MaintenanceLog existingLog = getMaintenanceLogById(maintenanceId);

        existingLog.setVehicle(maintenanceLog.getVehicle());
        existingLog.setMaintenanceType(maintenanceLog.getMaintenanceType());
        existingLog.setIssue(maintenanceLog.getIssue());
        existingLog.setDescription(maintenanceLog.getDescription());
        existingLog.setCost(maintenanceLog.getCost());
        existingLog.setStartDate(maintenanceLog.getStartDate());
        existingLog.setEndDate(maintenanceLog.getEndDate());
        existingLog.setStatus(maintenanceLog.getStatus());

        return maintenanceLogRepository.save(existingLog);
    }

    @Override
    public void deleteMaintenanceLog(Long maintenanceId) {

        MaintenanceLog maintenanceLog = getMaintenanceLogById(maintenanceId);

        maintenanceLogRepository.delete(maintenanceLog);
    }

    @Override
    public List<MaintenanceLog> getMaintenanceLogsByVehicle(Vehicle vehicle) {

        return maintenanceLogRepository.findByVehicle(vehicle);
    }

    @Override
    public List<MaintenanceLog> getMaintenanceLogsByStatus(MaintenanceStatus status) {

        return maintenanceLogRepository.findByStatus(status);
    }

    @Override
    public List<MaintenanceLog> getMaintenanceLogsByVehicleAndStatus(
            Vehicle vehicle,
            MaintenanceStatus status) {

        return maintenanceLogRepository.findByVehicleAndStatus(vehicle, status);
    }

    @Override
    public long countMaintenanceByStatus(MaintenanceStatus status) {

        return maintenanceLogRepository.countByStatus(status);
    }

    @Override
    public BigDecimal getTotalMaintenanceCost(Long vehicleId) {

        return maintenanceLogRepository.getTotalMaintenanceCost(vehicleId);
    }
}