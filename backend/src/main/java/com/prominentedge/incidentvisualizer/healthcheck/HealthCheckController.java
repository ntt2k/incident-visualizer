package com.prominentedge.incidentvisualizer.healthcheck;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * HealthCheckController
 */
@RestController
public class HealthCheckController {

  @GetMapping(value="/health")
  public HealthStatus healthCheck() {
      return new HealthStatus("pass");
  }

}