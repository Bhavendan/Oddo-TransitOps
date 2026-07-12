package org.example.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.backend.entity.FuelLog;
import org.example.backend.entity.Vehicle;
import org.example.backend.service.FuelLogService;
import org.example.backend.service.VehicleService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/fuel-logs")
@RequiredArgsConstructor
@CrossOrigin
public class FuelLogController {

    private final FuelLogService fuelLogService;
    private final VehicleService vehicleService;

    @GetMapping
    public List<FuelLog> getAll(
            @RequestParam(required = false) Long vehicleId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end
    ) {
        if (vehicleId != null) {
            Vehicle vehicle = vehicleService.getVehicleById(vehicleId);
            return fuelLogService.getFuelLogsByVehicle(vehicle);
        }
        if (start != null && end != null) {
            return fuelLogService.getFuelLogsBetweenDates(start, end);
        }
        return fuelLogService.getAllFuelLogs();
    }

    @GetMapping("/{id}")
    public FuelLog getById(@PathVariable Long id) {
        return fuelLogService.getFuelLogById(id);
    }

    @GetMapping("/vehicle/{vehicleId}/total-cost")
    public BigDecimal getTotalCost(@PathVariable Long vehicleId) {
        return fuelLogService.getTotalFuelCost(vehicleId);
    }

    @PostMapping
    public FuelLog create(@Valid @RequestBody FuelLog fuelLog) {
        return fuelLogService.saveFuelLog(fuelLog);
    }

    @PutMapping("/{id}")
    public FuelLog update(@PathVariable Long id, @Valid @RequestBody FuelLog fuelLog) {
        return fuelLogService.updateFuelLog(id, fuelLog);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        fuelLogService.deleteFuelLog(id);
    }
}
