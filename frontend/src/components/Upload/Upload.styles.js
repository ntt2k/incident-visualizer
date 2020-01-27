import styled from 'styled-components';
import { Uploader } from 'rsuite';

export const StyledUploader = styled(Uploader)`
  &.rs-uploader-text .rs-uploader-file-item {
    border: solid #d9d9d9 1px;
    border-radius: 5px;
    margin-top: 1vh;
  }

  .rs-uploader-trigger-btn {
    width: 300px;
    line-height: 120px;
  }
`;

