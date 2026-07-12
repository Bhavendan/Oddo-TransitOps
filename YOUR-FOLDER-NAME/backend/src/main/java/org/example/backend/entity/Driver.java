package org.example.backend.entity;



import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.example.backend.enums.DriverStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "drivers",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "license_number")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long driverId;

    @NotBlank(message = "Driver name is required")
    @Column(nullable = false, length = 100)
    private String name;

    @NotBlank(message = "License number is required")
    @Column(name = "license_number", nullable = false, unique = true, length = 50)
    private String licenseNumber;

    @NotBlank(message = "License category is required")
    @Column(nullable = false, length = 20)
    private String licenseCategory;

    @NotNull(message = "License expiry date is required")
    @Future(message = "License expiry must be a future date")
    @Column(nullable = false)
    private LocalDate licenseExpiryDate;

    @NotBlank(message = "Contact number is required")
    @Pattern(
            regexp = "^[6-9]\\d{9}$",
            message = "Enter a valid 10-digit mobile number"
    )
    @Column(nullable = false, length = 15)
    private String contactNumber;

    @NotNull(message = "Safety score is required")
    @Min(value = 0, message = "Safety score cannot be negative")
    @Max(value = 100, message = "Safety score cannot exceed 100")
    @Column(nullable = false)
    private Integer safetyScore;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private DriverStatus status = DriverStatus.AVAILABLE;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    /* ===========================
            RELATIONSHIPS
       =========================== */

    @OneToMany(mappedBy = "driver", cascade = CascadeType.ALL)
    @JsonManagedReference("driver-trips")
    @Builder.Default
    private List<Trip> trips = new ArrayList<>();

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
