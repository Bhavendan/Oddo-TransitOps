package org.example.backend.controller;





import lombok.RequiredArgsConstructor;
import org.example.backend.entity.MaintenanceLog;
import org.example.backend.entity.Vehicle;
import org.example.backend.enums.MaintenanceStatus;
import org.example.backend.service.MaintenanceLogService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MaintenanceLogController {

    private final MaintenanceLogService maintenanceLogService;

    @PostMapping
    public ResponseEntity<MaintenanceLog> create(@RequestBody MaintenanceLog maintenanceLog) {
        return new ResponseEntity<>(maintenanceLogService.saveMaintenanceLog(maintenanceLog), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<MaintenanceLog>> getAll() {
        return ResponseEntity.ok(maintenanceLogService.getAllMaintenanceLogs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaintenanceLog> getById(@PathVariable Long id) {
        return ResponseEntity.ok(maintenanceLogService.getMaintenanceLogById(id));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<MaintenanceLog>> getByStatus(@PathVariable MaintenanceStatus status) {
        return ResponseEntity.ok(maintenanceLogService.getMaintenanceLogsByStatus(status));
    }

    @GetMapping("/count/{status}")
    public ResponseEntity<Long> count(@PathVariable MaintenanceStatus status) {
        return ResponseEntity.ok(maintenanceLogService.countMaintenanceByStatus(status));
    }

    @GetMapping("/cost/{vehicleId}")
    public ResponseEntity<BigDecimal> totalCost(@PathVariable Long vehicleId) {
        return ResponseEntity.ok(maintenanceLogService.getTotalMaintenanceCost(vehicleId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MaintenanceLog> update(
            @PathVariable Long id,
            @RequestBody MaintenanceLog maintenanceLog) {
        return ResponseEntity.ok(maintenanceLogService.updateMaintenanceLog(id, maintenanceLog));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        maintenanceLogService.deleteMaintenanceLog(id);
        return ResponseEntity.noContent().build();
    }
}

