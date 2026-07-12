package org.example.backend.entity;



import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
import org.example.backend.enums.TripStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "trips")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tripId;

    @NotBlank(message = "Source is required")
    @Column(nullable = false, length = 100)
    private String source;

    @NotBlank(message = "Destination is required")
    @Column(nullable = false, length = 100)
    private String destination;

    @NotNull(message = "Cargo weight is required")
    @Positive(message = "Cargo weight must be greater than zero")
    @Column(nullable = false)
    private Double cargoWeight;

    @NotNull(message = "Planned distance is required")
    @Positive(message = "Distance must be greater than zero")
    @Column(nullable = false)
    private Double plannedDistance;

    private Double actualDistance;

    private Double fuelConsumed;

    @DecimalMin(value = "0.0", inclusive = true)
    @Column(precision = 12, scale = 2)
    private BigDecimal revenue;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private TripStatus status = TripStatus.DRAFT;

    private LocalDateTime dispatchTime;

    private LocalDateTime completionTime;

    private Double finalOdometer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id", nullable = false)
    @JsonBackReference
    private Vehicle vehicle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_id", nullable = false)
    @JsonBackReference
    private Driver driver;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

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