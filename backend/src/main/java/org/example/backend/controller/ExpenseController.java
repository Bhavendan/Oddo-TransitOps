package org.example.backend.controller;



import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Expense;
import org.example.backend.enums.ExpenseType;
import org.example.backend.service.ExpenseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<Expense> create(@RequestBody Expense expense) {
        return new ResponseEntity<>(expenseService.saveExpense(expense), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Expense>> getAll() {
        return ResponseEntity.ok(expenseService.getAllExpenses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getById(@PathVariable Long id) {
        return ResponseEntity.ok(expenseService.getExpenseById(id));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Expense>> getByType(@PathVariable ExpenseType type) {
        return ResponseEntity.ok(expenseService.getExpensesByType(type));
    }

    @GetMapping("/between")
    public ResponseEntity<List<Expense>> getBetweenDates(
            @RequestParam LocalDate start,
            @RequestParam LocalDate end) {
        return ResponseEntity.ok(expenseService.getExpensesBetweenDates(start, end));
    }

    @GetMapping("/cost/{vehicleId}")
    public ResponseEntity<BigDecimal> totalExpense(@PathVariable Long vehicleId) {
        return ResponseEntity.ok(expenseService.getTotalExpense(vehicleId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> update(
            @PathVariable Long id,
            @RequestBody Expense expense) {
        return ResponseEntity.ok(expenseService.updateExpense(id, expense));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}