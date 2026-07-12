package org.example.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Expense;
import org.example.backend.entity.Vehicle;
import org.example.backend.enums.ExpenseType;
import org.example.backend.service.ExpenseService;
import org.example.backend.service.VehicleService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
@CrossOrigin
public class ExpenseController {

    private final ExpenseService expenseService;
    private final VehicleService vehicleService;

    @GetMapping
    public List<Expense> getAll(
            @RequestParam(required = false) Long vehicleId,
            @RequestParam(required = false) ExpenseType type,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end
    ) {
        if (vehicleId != null) {
            Vehicle vehicle = vehicleService.getVehicleById(vehicleId);
            return expenseService.getExpensesByVehicle(vehicle);
        }
        if (type != null) return expenseService.getExpensesByType(type);
        if (start != null && end != null) return expenseService.getExpensesBetweenDates(start, end);
        return expenseService.getAllExpenses();
    }

    @GetMapping("/{id}")
    public Expense getById(@PathVariable Long id) {
        return expenseService.getExpenseById(id);
    }

    @GetMapping("/vehicle/{vehicleId}/total")
    public BigDecimal getTotal(@PathVariable Long vehicleId) {
        return expenseService.getTotalExpense(vehicleId);
    }

    @PostMapping
    public Expense create(@Valid @RequestBody Expense expense) {
        return expenseService.saveExpense(expense);
    }

    @PutMapping("/{id}")
    public Expense update(@PathVariable Long id, @Valid @RequestBody Expense expense) {
        return expenseService.updateExpense(id, expense);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        expenseService.deleteExpense(id);
    }
}
