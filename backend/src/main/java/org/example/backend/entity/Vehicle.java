package org.example.backend.entity;



import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
import org.example.backend.enums.VehicleStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "vehicles",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "registration_number")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vehicleId;

    @NotBlank(message = "Registration number is required")
    @Column(name = "registration_number", nullable = false, unique = true, length = 30)
    private String registrationNumber;

    @NotBlank(message = "Vehicle name is required")
    @Column(nullable = false, length = 100)
    private String vehicleName;

    @NotBlank(message = "Vehicle model is required")
    @Column(nullable = false, length = 100)
    private String vehicleModel;

    @NotBlank(message = "Vehicle type is required")
    @Column(nullable = false, length = 50)
    private String vehicleType;

    @NotNull(message = "Maximum load capacity is required")
    @Positive(message = "Capacity must be greater than zero")
    @Column(nullable = false)
    private Double maximumLoadCapacity;

    @NotNull(message = "Odometer reading is required")
    @Positive(message = "Odometer must be positive")
    @Column(nullable = false)
    private Double currentOdometer;

    @NotNull(message = "Acquisition cost is required")
    @DecimalMin(value = "0.0", inclusive = false)
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal acquisitionCost;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private VehicleStatus status = VehicleStatus.AVAILABLE;

    @Column(length = 100)
    private String region;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable =false)
    private LocalDateTime updatedAt;

    /* ===========================
            RELATIONSHIPS
       =========================== */

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL)
    @JsonManagedReference
    @Builder.Default
    private List<Trip> trips = new ArrayList<>();

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL)
    @JsonManagedReference
    @Builder.Default
    private List<MaintenanceLog> maintenanceLogs = new ArrayList<>();

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL)
    @JsonManagedReference
    @Builder.Default
    private List<FuelLog> fuelLogs = new ArrayList<>();

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL)
    @JsonManagedReference
    @Builder.Default
    private List<Expense> expenses = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

}
