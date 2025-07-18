import { lazy, Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import LanguageSelector from './components/LanguageSelector';
const RickAndMortyList = lazy(() => import('remote1/CharacterList'));
const HarryPotterList = lazy(() => import('remote2/CharacterList'));

const AppContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const AppHeader = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 1rem;
`;

const AppButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const AppButton = styled.button`
  background-color: ${props => (props.$active ? '#3498db' : '#e0e0e0')};
  color: ${props => (props.$active ? 'white' : '#2c3e50')};
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${props => (props.$active ? '#2980b9' : '#d0d0d0')};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const AppContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const AppLoader = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #7f8c8d;
`;

function App() {
  const [selectedList, setSelectedList] = useState(null);
  const { t } = useTranslation();

  return (
    <AppContainer className='app'>
      <LanguageSelector />
      <AppHeader className='app__header'>{t('title')}</AppHeader>

      <AppButtonContainer className='app__button-container'>
        <AppButton
          className='app__button app__button--rick'
          $active={selectedList === 'rick'}
          onClick={() => setSelectedList('rick')}
        >
          {t('rickAndMorty')}
        </AppButton>
        <AppButton
          className='app__button app__button--harry'
          $active={selectedList === 'harry'}
          onClick={() => setSelectedList('harry')}
        >
          {t('harryPotter')}
        </AppButton>
      </AppButtonContainer>

      <AppContent className='app__content'>
        <Suspense
          fallback={
            <AppLoader className='app__loader'>{t('loading')}</AppLoader>
          }
        >
          {selectedList === 'rick' && (
            <div data-testid='rick-and-morty-list'>
              <RickAndMortyList />
            </div>
          )}
          {selectedList === 'harry' && (
            <div data-testid='harry-potter-list'>
              <HarryPotterList />
            </div>
          )}
          {!selectedList && (
            <AppLoader className='app__loader'>
              {t('selectCharacterList')}
            </AppLoader>
          )}
        </Suspense>
      </AppContent>
    </AppContainer>
  );
}

export default App;
