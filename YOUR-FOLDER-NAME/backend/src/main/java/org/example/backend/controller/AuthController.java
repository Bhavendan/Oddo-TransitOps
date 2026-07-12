package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.config.TokenStore;
import org.example.backend.entity.User;
import org.example.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final TokenStore tokenStore;

    public record LoginRequest(String email, String password) {}

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest request) {
        User user;
        try {
            user = userService.getUserByEmail(request.email());
        } catch (RuntimeException ex) {
            return unauthorized();
        }

        if (user == null || !Boolean.TRUE.equals(user.getEnabled())) {
            return unauthorized();
        }

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            return unauthorized();
        }

        String token = tokenStore.issueToken(user.getUserId());

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("token", token);
        body.put("user", Map.of(
                "userId", user.getUserId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "role", user.getRole() != null ? user.getRole().getName() : null
        ));
        return ResponseEntity.ok(body);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            tokenStore.revoke(authHeader.substring(7));
        }
        return ResponseEntity.noContent().build();
    }

    private ResponseEntity<Object> unauthorized() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", Instant.now().toString());
        body.put("status", 401);
        body.put("error", "Invalid email or password");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(body);
    }
}
