import styled from 'styled-components';

const ErrorContainer = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  color: #ff6b6b;
  font-size: 1.2rem;
  padding: 2rem;
`;

export const Error = ({ error }) => {
  return <ErrorContainer>Error: {error}</ErrorContainer>;
};
