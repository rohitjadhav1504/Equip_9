package com.MainApp.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.MainApp.DTO.UserDTO;
import com.MainApp.Entity.Registration;
import com.MainApp.Repository.RegistrationRepo;

@RestController
@RequestMapping("/")
public class RegistrationController {

    @Autowired
    private RegistrationRepo repository;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Registration registration) {
        registration.setPassword(new BCryptPasswordEncoder().encode(registration.getPassword()));
        repository.save(registration);
        return ResponseEntity.ok("User registered successfully");
    }

    @GetMapping("/login")
    public ResponseEntity<?> login(@RequestParam String mobileNumber, @RequestParam String password) {
        Registration user = repository.findByMobileNumber(mobileNumber)
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (new BCryptPasswordEncoder().matches(password, user.getPassword())) {
            UserDTO userDTO = new UserDTO(user.getFirstName(), user.getLastName());
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

}
