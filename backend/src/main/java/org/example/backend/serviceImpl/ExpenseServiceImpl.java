package org.example.backend.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Expense;
import org.example.backend.entity.Vehicle;
import org.example.backend.enums.ExpenseType;
import org.example.backend.repository.ExpenseRepository;
import org.example.backend.service.ExpenseService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;

    @Override
    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    @Override
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @Override
    public Expense getExpenseById(Long expenseId) {
        return expenseRepository.findById(expenseId)
                .orElseThrow(() ->
                        new RuntimeException("Expense not found with id: " + expenseId));
    }

    @Override
    public Expense updateExpense(Long expenseId, Expense expense) {

        Expense existingExpense = getExpenseById(expenseId);

        existingExpense.setVehicle(expense.getVehicle());
        existingExpense.setExpenseType(expense.getExpenseType());
        existingExpense.setAmount(expense.getAmount());
        existingExpense.setExpenseDate(expense.getExpenseDate());
        existingExpense.setDescription(expense.getDescription());

        return expenseRepository.save(existingExpense);
    }

    @Override
    public void deleteExpense(Long expenseId) {

        Expense expense = getExpenseById(expenseId);

        expenseRepository.delete(expense);
    }

    @Override
    public List<Expense> getExpensesByVehicle(Vehicle vehicle) {

        return expenseRepository.findByVehicle(vehicle);
    }

    @Override
    public List<Expense> getExpensesByType(ExpenseType expenseType) {

        return expenseRepository.findByExpenseType(expenseType);
    }

    @Override
    public List<Expense> getExpensesBetweenDates(LocalDate start, LocalDate end) {

        return expenseRepository.findByExpenseDateBetween(start, end);
    }

    @Override
    public BigDecimal getTotalExpense(Long vehicleId) {

        return expenseRepository.getTotalExpense(vehicleId);
    }
}