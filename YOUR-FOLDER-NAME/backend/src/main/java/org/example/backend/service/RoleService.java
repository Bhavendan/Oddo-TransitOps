package org.example.backend.service;

import org.example.backend.entity.Role;
import org.example.backend.enums.RoleName;

import java.util.List;

public interface RoleService {

    Role saveRole(Role role);

    List<Role> getAllRoles();

    Role getRoleById(Long roleId);

    Role updateRole(Long roleId, Role role);

    void deleteRole(Long roleId);

    Role getRoleByName(RoleName roleName);

    boolean existsByName(RoleName roleName);
}