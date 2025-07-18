import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const CardContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  position: relative;

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ffd700, #dc143c, #228b22, #4169e1);
    background-size: 300% 100%;
    animation: ${shimmer} 3s linear infinite;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const CharacterImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 150px;
  }
`;

const CharacterName = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HouseInfo = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
  margin: 0;
  text-align: center;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #ffd700, #dc143c);
  border-radius: 15px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    height: 150px;
    font-size: 2.5rem;
  }
`;

export const CharacterCard = ({ character }) => {
  return (
    <CardContainer>
      {character.image ? (
        <CharacterImage src={character.image} alt={character.name} />
      ) : (
        <PlaceholderImage>{character.name?.charAt(0) || '?'}</PlaceholderImage>
      )}
      <CharacterName>{character.name}</CharacterName>
      {character.house && <HouseInfo>House: {character.house}</HouseInfo>}
    </CardContainer>
  );
};
