package com.prominentedge.incidentvisualizer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

import com.prominentedge.incidentvisualizer.storage.StorageProperties;
import com.prominentedge.incidentvisualizer.storage.StorageService;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class IncidentVisualizerApplication {

  public static void main(String[] args) {
    SpringApplication.run(IncidentVisualizerApplication.class, args);
  }

  @Bean
  CommandLineRunner init(StorageService storageService) {
    return (args) -> {
      storageService.deleteAll();
      storageService.init();
    };
  }

}
