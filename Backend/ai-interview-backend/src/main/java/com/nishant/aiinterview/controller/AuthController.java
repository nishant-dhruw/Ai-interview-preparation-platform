package com.nishant.aiinterview.controller;

import com.nishant.aiinterview.dto.AuthResponse;
import com.nishant.aiinterview.entity.User;
import com.nishant.aiinterview.security.JwtService;
import com.nishant.aiinterview.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(
            UserService userService,
            JwtService jwtService) {

        this.userService = userService;
        this.jwtService = jwtService;
    }

    // =========================
    // REGISTER
    // =========================

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody User user) {

        User savedUser = userService.registerUser(user);

        // Generate JWT after successful registration
        String token = jwtService.generateToken(
                savedUser.getEmail()
        );

        AuthResponse response = new AuthResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                token
        );

        return ResponseEntity.ok(response);
    }

    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody Map<String, String> loginRequest) {

        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        User user = userService.loginUser(
                email,
                password
        );

        // Generate JWT after successful login
        String token = jwtService.generateToken(
                user.getEmail()
        );

        AuthResponse response = new AuthResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                token
        );

        return ResponseEntity.ok(response);
    }
    @GetMapping("/test")
    public ResponseEntity<String> testProtectedEndpoint() {
        return ResponseEntity.ok("JWT authentication is working!");
    }
}