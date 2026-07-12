package org.example.backend.service;

import org.example.backend.entity.Expense;
import org.example.backend.entity.Vehicle;
import org.example.backend.enums.ExpenseType;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface ExpenseService {

    Expense saveExpense(Expense expense);

    List<Expense> getAllExpenses();

    Expense getExpenseById(Long expenseId);

    Expense updateExpense(Long expenseId, Expense expense);

    void deleteExpense(Long expenseId);

    List<Expense> getExpensesByVehicle(Vehicle vehicle);

    List<Expense> getExpensesByType(ExpenseType expenseType);

    List<Expense> getExpensesBetweenDates(LocalDate start, LocalDate end);

    BigDecimal getTotalExpense(Long vehicleId);
}