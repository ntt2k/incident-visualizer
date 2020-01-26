package com.prominentedge.incidentvisualizer;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import com.prominentedge.incidentvisualizer.storage.StorageFileNotFoundException;
import com.prominentedge.incidentvisualizer.storage.StorageService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

@RestController
public class FileUploadController {
  private final StorageService storageService;

  private static final Logger LOGGER = LoggerFactory.getLogger(
    FileUploadController.class
  );

  @Autowired
  public FileUploadController(StorageService storageService) {
    this.storageService = storageService;
  }

  @GetMapping("/files")
  public List<String> listUploadedFiles() throws IOException {
    return storageService
      .loadAll()
      .map(
        path ->
          MvcUriComponentsBuilder
            .fromMethodName(
              FileUploadController.class,
              "serveFile",
              path.getFileName().toString()
            )
            .build()
            .toString()
      )
      .collect(Collectors.toList());
  }

  @GetMapping("/files/{filename:.+}")
  public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
    Resource file = storageService.loadAsResource(filename);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .contentType(MediaType.APPLICATION_JSON)
      .body(file);
  }

  @PostMapping("/files/upload")
  public ResponseEntity handleFileUpload(
    @RequestParam("file") MultipartFile file
  ) {
    storageService.store(file);

    return serveFile(file.getOriginalFilename());
  }

  @ExceptionHandler(StorageFileNotFoundException.class)
  public ResponseEntity<?> handleStorageFileNotFound(
    StorageFileNotFoundException exc
  ) {
    return ResponseEntity.notFound().build();
  }
}
