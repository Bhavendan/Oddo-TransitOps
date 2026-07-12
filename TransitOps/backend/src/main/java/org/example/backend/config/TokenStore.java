package org.example.backend.config;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Minimal in-memory session store: maps a random token to a userId.
 * Tokens live only in this server's memory, so they're cleared whenever
 * the backend restarts — fine for development, not for production.
 */
@Component
public class TokenStore {

    private final Map<String, Long> tokenToUserId = new ConcurrentHashMap<>();

    public String issueToken(Long userId) {
        String token = UUID.randomUUID().toString();
        tokenToUserId.put(token, userId);
        return token;
    }

    public Optional<Long> resolve(String token) {
        return Optional.ofNullable(tokenToUserId.get(token));
    }

    public void revoke(String token) {
        tokenToUserId.remove(token);
    }
}
