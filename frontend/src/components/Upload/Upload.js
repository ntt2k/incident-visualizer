import React from 'react';
import { StyledUploader } from './Upload.styles';

function renderFileInfo(file) {
  return (
    <div onClick={() => console.log('TRUNG IS HERE!')}>
      <span>File Name: {file.name}</span>
      <p>File URL: {`${REACT_APP_API_BASE_URL}/files/${file.name}`}</p>
    </div>
  );
}

const { REACT_APP_API_BASE_URL } = process.env;

const Upload = (props) => {
  const { onSuccessUpload } = props;

  return (
    <StyledUploader
      dragable
      action={`${REACT_APP_API_BASE_URL}/files/upload`}
      renderFileInfo={renderFileInfo}
      onSuccess={(response) => {
        console.log('response', response);
        onSuccessUpload(response);
      }}
    >
      <div>Click or Drag files to this area to upload</div>
    </StyledUploader>
  );
};

export default Upload;
