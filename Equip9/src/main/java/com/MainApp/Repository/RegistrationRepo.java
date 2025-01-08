package com.MainApp.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.MainApp.Entity.Registration;

@Repository
public interface RegistrationRepo extends JpaRepository<Registration, Long>{
	Optional<Registration> findByMobileNumber(String mobileNumber);
}
