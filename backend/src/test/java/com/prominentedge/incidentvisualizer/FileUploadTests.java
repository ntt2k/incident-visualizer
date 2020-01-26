package com.prominentedge.incidentvisualizer;

import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.nio.file.Paths;
import java.util.stream.Stream;

import com.prominentedge.incidentvisualizer.storage.StorageFileNotFoundException;
import com.prominentedge.incidentvisualizer.storage.StorageService;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

@AutoConfigureMockMvc
@SpringBootTest
public class FileUploadTests {
  @Autowired
  private MockMvc mvc;

  @MockBean
  private StorageService storageService;

  private static final Logger LOGGER = LoggerFactory.getLogger(
    FileUploadTests.class
  );

  @Test
  public void shouldListAllFiles() throws Exception {
    given(this.storageService.loadAll())
      .willReturn(Stream.of(Paths.get("first.json"), Paths.get("second.json")));

    this.mvc.perform(get("/files"))
      .andExpect(status().isOk());
      // .andExpect(
      //   content()
      //     .json(
      //       List
      //         .of(
      //           "http://localhost/files/first.json",
      //           "http://localhost/files/second.json"
      //         )
      //         .toString()
      //     )
      // );
      // .andReturn();
  }

  @Test
  public void shouldSaveUploadedFile() throws Exception {
  MockMultipartFile multipartFile = new MockMultipartFile(
  "file",
  "test.json",
  "apllication/json",
  "{ \"key\": \"test data\" }".getBytes()
  );
  this.mvc.perform(multipart("/files/upload").file(multipartFile))
  .andExpect(status().isCreated());
  // .andExpect(header().string("Location", "/files"));

  then(this.storageService).should().store(multipartFile);
  }

  @SuppressWarnings("unchecked")
  @Test
  public void should404WhenMissingFile() throws Exception {
  given(this.storageService.loadAsResource("test.json"))
  .willThrow(StorageFileNotFoundException.class);

  this.mvc.perform(get("/files/test.json")).andExpect(status().isNotFound());
  }
}
