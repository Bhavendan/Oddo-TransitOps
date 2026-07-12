package org.example.backend.config;

import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Role;
import org.example.backend.entity.User;
import org.example.backend.enums.RoleName;
import org.example.backend.service.RoleService;
import org.example.backend.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final RoleService roleService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    private static final Map<RoleName, String> ROLE_DESCRIPTIONS = Map.of(
            RoleName.ADMIN, "Full system access",
            RoleName.FLEET_MANAGER, "Manages vehicles, drivers, and trips",
            RoleName.DRIVER, "Driver-level access",
            RoleName.SAFETY_OFFICER, "Oversees safety and compliance",
            RoleName.FINANCIAL_ANALYST, "Views and manages expenses/costs"
    );

    private static final String DEFAULT_ADMIN_EMAIL = "admin@transitops.io";
    private static final String DEFAULT_ADMIN_PASSWORD = "admin123";

    @Override
    public void run(String... args) {
        for (RoleName roleName : RoleName.values()) {
            if (!roleService.existsByName(roleName)) {
                Role role = Role.builder()
                        .name(roleName)
                        .description(ROLE_DESCRIPTIONS.get(roleName))
                        .createdAt(LocalDateTime.now())
                        .build();
                roleService.saveRole(role);
            }
        }

        if (!userService.existsByEmail(DEFAULT_ADMIN_EMAIL)) {
            Role adminRole = roleService.getRoleByName(RoleName.ADMIN);
            User admin = User.builder()
                    .name("Admin")
                    .email(DEFAULT_ADMIN_EMAIL)
                    .password(passwordEncoder.encode(DEFAULT_ADMIN_PASSWORD))
                    .enabled(true)
                    .role(adminRole)
                    .build();
            userService.saveUser(admin);
        }
    }
}