import React from 'react';
import ReactJson from 'react-json-view';
import styled from 'styled-components';

export const StyledDiv = styled.div`
  margin-top: 1.5rem;
`;

const JsonViewer = (props) => {
  return (
    <StyledDiv>
      <ReactJson theme="flat" {...props} />
    </StyledDiv>
  )
}

export default JsonViewer










