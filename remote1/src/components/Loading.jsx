import styled from 'styled-components';

const LoadingContainer = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  color: white;
  font-size: 1.5rem;
  padding: 2rem;
`;

export const Loading = () => {
  return <LoadingContainer>Loading characters...</LoadingContainer>;
};
