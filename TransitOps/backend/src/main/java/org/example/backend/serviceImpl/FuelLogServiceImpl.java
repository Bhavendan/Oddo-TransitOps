package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.entity.FuelLog;
import org.example.backend.entity.Vehicle;
import org.example.backend.repository.FuelLogRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FuelLogServiceImpl implements FuelLogService {

    private final FuelLogRepository fuelLogRepository;

    @Override
    public FuelLog saveFuelLog(FuelLog fuelLog) {
        return fuelLogRepository.save(fuelLog);
    }

    @Override
    public List<FuelLog> getAllFuelLogs() {
        return fuelLogRepository.findAll();
    }

    @Override
    public FuelLog getFuelLogById(Long fuelLogId) {
        return fuelLogRepository.findById(fuelLogId)
                .orElseThrow(() ->
                        new RuntimeException("Fuel Log not found with id: " + fuelLogId));
    }

    @Override
    public FuelLog updateFuelLog(Long fuelLogId, FuelLog fuelLog) {

        FuelLog existingFuelLog = getFuelLogById(fuelLogId);

        existingFuelLog.setVehicle(fuelLog.getVehicle());
        existingFuelLog.setFuelDate(fuelLog.getFuelDate());
        existingFuelLog.setLiters(fuelLog.getLiters());
        existingFuelLog.setCost(fuelLog.getCost());
        existingFuelLog.setOdometerReading(fuelLog.getOdometerReading());
        existingFuelLog.setRemarks(fuelLog.getRemarks());
        existingFuelLog.setFuelConsumed(fuelLog.getFuelConsumed());

        return fuelLogRepository.save(existingFuelLog);
    }

    @Override
    public void deleteFuelLog(Long fuelLogId) {

        FuelLog fuelLog = getFuelLogById(fuelLogId);

        fuelLogRepository.delete(fuelLog);
    }

    @Override
    public List<FuelLog> getFuelLogsByVehicle(Vehicle vehicle) {

        return fuelLogRepository.findByVehicle(vehicle);
    }

    @Override
    public List<FuelLog> getFuelLogsBetweenDates(LocalDate start, LocalDate end) {

        return fuelLogRepository.findByFuelDateBetween(start, end);
    }

    @Override
    public BigDecimal getTotalFuelCost(Long vehicleId) {

        return fuelLogRepository.getTotalFuelCost(vehicleId);
    }
}