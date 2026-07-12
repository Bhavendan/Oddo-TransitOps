package org.example.backend.controller;



import lombok.RequiredArgsConstructor;
import org.example.backend.entity.FuelLog;
import org.example.backend.service.FuelLogService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/fuel")
@RequiredArgsConstructor

public class FuelLogController {

    private final FuelLogService fuelLogService;

    @PostMapping
    public ResponseEntity<FuelLog> create(@RequestBody FuelLog fuelLog) {
        return new ResponseEntity<>(fuelLogService.saveFuelLog(fuelLog), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<FuelLog>> getAll() {
        return ResponseEntity.ok(fuelLogService.getAllFuelLogs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FuelLog> getById(@PathVariable Long id) {
        return ResponseEntity.ok(fuelLogService.getFuelLogById(id));
    }

    @GetMapping("/cost/{vehicleId}")
    public ResponseEntity<BigDecimal> totalFuelCost(@PathVariable Long vehicleId) {
        return ResponseEntity.ok(fuelLogService.getTotalFuelCost(vehicleId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FuelLog> update(
            @PathVariable Long id,
            @RequestBody FuelLog fuelLog) {
        return ResponseEntity.ok(fuelLogService.updateFuelLog(id, fuelLog));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        fuelLogService.deleteFuelLog(id);
        return ResponseEntity.noContent().build();
    }
}
