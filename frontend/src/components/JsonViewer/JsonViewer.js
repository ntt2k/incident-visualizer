import React from 'react';
import ReactJson from 'react-json-view';
import styled from 'styled-components';

export const StyledDiv = styled.div`
  margin-top: 2rem;
`;

const JsonViewer = (props) => {
  return (
    <StyledDiv>
      <ReactJson  {...props} />
    </StyledDiv>
  )
}

export default JsonViewer










