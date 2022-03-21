package com.congressconnection.conspring;

import com.congressconnection.conspring.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EnableJpaRepositories(basePackageClasses = UserRepository.class)
public class ConspringApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConspringApplication.class, args);
	}

}
