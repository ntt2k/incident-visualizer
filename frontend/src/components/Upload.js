import React from 'react';
import { Uploader } from 'rsuite';

const styles = {
  width: '300px',
  lineHeight: '120px'
};

const fileList = [
  {
    name: 'a.png',
    fileKey: 1,
    url:
      'https://user-images.githubusercontent.com/1203827/47638792-92414e00-db9a-11e8-89c2-f8f430a23cd3.png'
  },
  {
    name: 'b.png',
    fileKey: 2,
    url:
      'https://user-images.githubusercontent.com/1203827/47638807-9d947980-db9a-11e8-9ee5-e0cc9cd7e8ad.png'
  }
];

const { REACT_APP_API_BASE_URL } = process.env;

const Upload = () => {
  console.log('REACT_APP_API_BASE_URL', REACT_APP_API_BASE_URL)

  return (
    <Uploader
      dragable
      listType="picture-text"
      defaultFileList={fileList}
      action={`${REACT_APP_API_BASE_URL}/files/upload`}
      renderFileInfo={(file, fileElement) => {
        return (
          <div>
            <span>File Name: {file.name}</span>
            <p>File URL: {file.url}</p>
          </div>
        );
      }}
    >
      <div style={styles}>Click or Drag files to this area to upload</div>
    </Uploader>
  );
};

export default Upload;
