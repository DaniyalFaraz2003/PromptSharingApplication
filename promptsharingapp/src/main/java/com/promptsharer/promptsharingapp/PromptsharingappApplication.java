package com.promptsharer.promptsharingapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.MongoTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.lang.management.PlatformLoggingMXBean;

@SpringBootApplication
@EnableTransactionManagement
public class PromptsharingappApplication {

	public static void main(String[] args) {
		SpringApplication.run(PromptsharingappApplication.class, args);
	}

	@Bean
	public PlatformTransactionManager manage(MongoDatabaseFactory dbFactory) {
		return new MongoTransactionManager(dbFactory);
	}
}
