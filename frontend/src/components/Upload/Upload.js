import React from 'react';
import axios from 'axios';
import { StyledUploader, StyledDiv, StyledButton } from './Upload.styles';

function getData(file, setData) {
  axios.get(`${REACT_APP_API_BASE_URL}/files/${file.name}`).then((res) => {
    setData(res.data);
  });
}

function renderFileInfo(file, setData) {
  return (
    <StyledDiv>
      <div>
        <span>File Name: {file.name}</span>
        <p>File URL: {`${REACT_APP_API_BASE_URL}/files/${file.name}`}</p>
      </div>
      <StyledButton appearance="primary" onClick={() => getData(file, setData)}>
        {' '}
        Load data{' '}
      </StyledButton>
    </StyledDiv>
  );
}

const { REACT_APP_API_BASE_URL } = process.env;

const Upload = (props) => {
  const { setData } = props;

  return (
    <StyledUploader
      dragable
      action={`${REACT_APP_API_BASE_URL}/files/upload`}
      renderFileInfo={(file) => renderFileInfo(file, setData)}
      onSuccess={(data) => {
        setData(data);
      }}
    >
      <div>Click or Drag files to this area to upload</div>
    </StyledUploader>
  );
};

export default Upload;
