package org.example.backend.service;

import org.example.backend.entity.User;

import java.util.List;

public interface UserService {

    User saveUser(User user);

    List<User> getAllUsers();

    User getUserById(Long userId);

    User updateUser(Long userId, User user);

    void deleteUser(Long userId);

    User getUserByEmail(String email);

    boolean existsByEmail(String email);
}