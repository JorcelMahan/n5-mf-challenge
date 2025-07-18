import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: absolute;
  top: 2rem;
  right: 2rem;
`;

const SelectorLabel = styled.span`
  font-size: 0.9rem;
  color: #2c3e50;
  font-weight: 500;
`;

const SelectorDropdown = styled.select`
  padding: 0.3rem 0.8rem;
  border: 2px solid #3498db;
  border-radius: 5px;
  background-color: white;
  color: #2c3e50;
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;

  &:hover {
    border-color: #2980b9;
    box-shadow: 0 2px 4px rgba(52, 152, 219, 0.2);
  }

  &:focus {
    border-color: #2980b9;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
`;

const SelectorOption = styled.option`
  padding: 0.5rem;
`;

function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = event => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <SelectorContainer
      className='language-selector'
      data-testid='language-selector'
    >
      <SelectorLabel className='language-selector__label'>
        {t('language')}:
      </SelectorLabel>
      <SelectorDropdown
        className='language-selector__dropdown'
        value={i18n.language}
        onChange={handleLanguageChange}
      >
        <SelectorOption value='en'>English</SelectorOption>
        <SelectorOption value='es'>Español</SelectorOption>
      </SelectorDropdown>
    </SelectorContainer>
  );
}

export default LanguageSelector;
