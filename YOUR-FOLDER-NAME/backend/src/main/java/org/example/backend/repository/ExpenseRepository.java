package org.example.backend.repository;


import org.example.backend.entity.Expense;
import org.example.backend.entity.Vehicle;
import org.example.backend.enums.ExpenseType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByVehicle(Vehicle vehicle);

    List<Expense> findByExpenseType(ExpenseType expenseType);

    List<Expense> findByExpenseDateBetween(
            LocalDate start,
            LocalDate end
    );

    @Query("""
            SELECT COALESCE(SUM(e.amount),0)
            FROM Expense e
            WHERE e.vehicle.vehicleId=:vehicleId
            """)
    BigDecimal getTotalExpense(Long vehicleId);


}
