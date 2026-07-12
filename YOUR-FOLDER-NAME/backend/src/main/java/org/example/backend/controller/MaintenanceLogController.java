package org.example.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.backend.entity.MaintenanceLog;
import org.example.backend.entity.Vehicle;
import org.example.backend.enums.MaintenanceStatus;
import org.example.backend.service.MaintenanceLogService;
import org.example.backend.service.VehicleService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/maintenance-logs")
@RequiredArgsConstructor
@CrossOrigin
public class MaintenanceLogController {

    private final MaintenanceLogService maintenanceLogService;
    private final VehicleService vehicleService;

    @GetMapping
    public List<MaintenanceLog> getAll(
            @RequestParam(required = false) Long vehicleId,
            @RequestParam(required = false) MaintenanceStatus status
    ) {
        if (vehicleId != null) {
            Vehicle vehicle = vehicleService.getVehicleById(vehicleId);
            return status != null
                    ? maintenanceLogService.getMaintenanceLogsByVehicleAndStatus(vehicle, status)
                    : maintenanceLogService.getMaintenanceLogsByVehicle(vehicle);
        }
        if (status != null) return maintenanceLogService.getMaintenanceLogsByStatus(status);
        return maintenanceLogService.getAllMaintenanceLogs();
    }

    @GetMapping("/{id}")
    public MaintenanceLog getById(@PathVariable Long id) {
        return maintenanceLogService.getMaintenanceLogById(id);
    }

    @GetMapping("/vehicle/{vehicleId}/total-cost")
    public BigDecimal getTotalCost(@PathVariable Long vehicleId) {
        return maintenanceLogService.getTotalMaintenanceCost(vehicleId);
    }

    @GetMapping("/stats/count-by-status")
    public Object countByStatus() {
        return java.util.Arrays.stream(MaintenanceStatus.values())
                .collect(java.util.stream.Collectors.toMap(s -> s, maintenanceLogService::countMaintenanceByStatus));
    }

    @PostMapping
    public MaintenanceLog create(@Valid @RequestBody MaintenanceLog maintenanceLog) {
        return maintenanceLogService.saveMaintenanceLog(maintenanceLog);
    }

    @PutMapping("/{id}")
    public MaintenanceLog update(@PathVariable Long id, @Valid @RequestBody MaintenanceLog maintenanceLog) {
        return maintenanceLogService.updateMaintenanceLog(id, maintenanceLog);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        maintenanceLogService.deleteMaintenanceLog(id);
    }
}
