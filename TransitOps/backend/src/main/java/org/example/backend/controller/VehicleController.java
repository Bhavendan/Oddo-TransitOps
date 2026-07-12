package org.example.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Vehicle;
import org.example.backend.enums.VehicleStatus;
import org.example.backend.service.VehicleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
@CrossOrigin
public class VehicleController {

    private final VehicleService vehicleService;

    @GetMapping
    public List<Vehicle> getAll(
            @RequestParam(required = false) VehicleStatus status,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String type
    ) {
        if (status != null) return vehicleService.getVehiclesByStatus(status);
        if (region != null) return vehicleService.getVehiclesByRegion(region);
        if (type != null) return vehicleService.getVehiclesByType(type);
        return vehicleService.getAllVehicles();
    }

    @GetMapping("/{id}")
    public Vehicle getById(@PathVariable Long id) {
        return vehicleService.getVehicleById(id);
    }

    @GetMapping("/registration/{regNo}")
    public Vehicle getByRegistration(@PathVariable String regNo) {
        return vehicleService.getVehicleByRegistrationNumber(regNo);
    }

    @GetMapping("/stats/count-by-status")
    public Object countByStatus() {
        return java.util.Arrays.stream(VehicleStatus.values())
                .collect(java.util.stream.Collectors.toMap(s -> s, vehicleService::countVehiclesByStatus));
    }

    @PostMapping
    public Vehicle create(@Valid @RequestBody Vehicle vehicle) {
        return vehicleService.saveVehicle(vehicle);
    }

    @PutMapping("/{id}")
    public Vehicle update(@PathVariable Long id, @Valid @RequestBody Vehicle vehicle) {
        return vehicleService.updateVehicle(id, vehicle);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
    }
}
