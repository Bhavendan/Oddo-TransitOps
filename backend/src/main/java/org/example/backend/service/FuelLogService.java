package org.example.backend.service;

import org.example.backend.entity.FuelLog;
import org.example.backend.entity.Vehicle;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface FuelLogService {

    FuelLog saveFuelLog(FuelLog fuelLog);

    List<FuelLog> getAllFuelLogs();

    FuelLog getFuelLogById(Long fuelLogId);

    FuelLog updateFuelLog(Long fuelLogId, FuelLog fuelLog);

    void deleteFuelLog(Long fuelLogId);

    List<FuelLog> getFuelLogsByVehicle(Vehicle vehicle);

    List<FuelLog> getFuelLogsBetweenDates(LocalDate start, LocalDate end);

    BigDecimal getTotalFuelCost(Long vehicleId);
}