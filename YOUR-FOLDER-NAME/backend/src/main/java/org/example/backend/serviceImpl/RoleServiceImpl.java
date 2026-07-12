package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Role;
import org.example.backend.enums.RoleName;
import org.example.backend.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    public Role saveRole(Role role) {

        if (roleRepository.existsByName(role.getName())) {
            throw new RuntimeException("Role already exists.");
        }

        return roleRepository.save(role);
    }

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role getRoleById(Long roleId) {
        return roleRepository.findById(roleId)
                .orElseThrow(() ->
                        new RuntimeException("Role not found with id: " + roleId));
    }

    @Override
    public Role updateRole(Long roleId, Role role) {

        Role existingRole = getRoleById(roleId);

        existingRole.setName(role.getName());
        existingRole.setDescription(role.getDescription());

        return roleRepository.save(existingRole);
    }

    @Override
    public void deleteRole(Long roleId) {

        Role role = getRoleById(roleId);

        roleRepository.delete(role);
    }

    @Override
    public Role getRoleByName(RoleName roleName) {

        return roleRepository.findByName(roleName)
                .orElseThrow(() ->
                        new RuntimeException("Role not found: " + roleName));
    }

    @Override
    public boolean existsByName(RoleName roleName) {

        return roleRepository.existsByName(roleName);
    }
}