package com.nishant.aiinterview.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        System.out.println("========== JWT FILTER ==========");
        System.out.println("Request: " + request.getRequestURI());
        System.out.println("Authorization header present: " + (authHeader != null));

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            System.out.println("No Bearer token found.");
            System.out.println("================================");

            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        System.out.println("Bearer token received.");
        System.out.println("Token length: " + token.length());

        try {

            boolean valid = jwtService.isTokenValid(token);

            System.out.println("JWT valid: " + valid);

            if (valid &&
                    SecurityContextHolder.getContext()
                            .getAuthentication() == null) {

                String email = jwtService.extractEmail(token);

                System.out.println("Email extracted from JWT: " + email);

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                email,
                                null,
                                Collections.emptyList()
                        );

                SecurityContextHolder.getContext()
                        .setAuthentication(authentication);

                System.out.println("Authentication stored in SecurityContext.");
                System.out.println("Authenticated: " +
                        SecurityContextHolder.getContext()
                                .getAuthentication()
                                .isAuthenticated());
            }

        } catch (Exception e) {

            System.out.println("JWT ERROR: " + e.getClass().getName());
            System.out.println("JWT ERROR MESSAGE: " + e.getMessage());
        }

        System.out.println("================================");

        filterChain.doFilter(request, response);
    }
}