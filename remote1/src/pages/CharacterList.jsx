import styled from 'styled-components';
import { CharacterCard } from '../components/CharacterCard';
import { Error } from '../components/Error';
import { Loading } from '../components/Loading';
import { useCharacters } from '../hooks/useCharacters';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export default function CharacterList() {
  const { characters, loading, error } = useCharacters();

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Error error={error} />
      </Container>
    );
  }

  return (
    <Container>
      {characters.map(char => (
        <CharacterCard key={char.id} character={char} />
      ))}
    </Container>
  );
}
