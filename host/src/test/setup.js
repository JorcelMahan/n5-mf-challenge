import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';

// Mock styled-components
vi.mock('styled-components', () => {
  const styled = tag => () => {
    const StyledComponent = ({ children, ...props }) => {
      return React.createElement(tag, props, children);
    };
    StyledComponent.displayName = `styled.${tag}`;
    return StyledComponent;
  };

  styled.div = styled('div');
  styled.span = styled('span');
  styled.img = styled('img');
  styled.button = styled('button');
  styled.p = styled('p');
  styled.h1 = styled('h1');
  styled.h2 = styled('h2');
  styled.h3 = styled('h3');

  return {
    __esModule: true,
    default: styled,
    css: () => '',
    keyframes: () => '',
  };
});

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => {
      const translations = {
        title: 'N5 CHALLENGE',
        rickAndMorty: 'View Rick & Morty characters',
        harryPotter: 'View Harry Potter characters',
        loading: 'Loading...',
        selectCharacterList: 'Please select a character list.',
      };
      return translations[key] || key;
    },
    i18n: {
      changeLanguage: vi.fn(),
    },
  }),
}));

// Mock the remote modules
vi.mock('remote1/CharacterList', () => ({
  default: () =>
    React.createElement(
      'div',
      { 'data-testid': 'rick-and-morty-list' },
      'Rick and Morty Characters'
    ),
}));

vi.mock('remote2/CharacterList', () => ({
  default: () =>
    React.createElement(
      'div',
      { 'data-testid': 'harry-potter-list' },
      'Harry Potter Characters'
    ),
}));

// Mock LanguageSelector component
vi.mock('../components/LanguageSelector', () => ({
  default: () =>
    React.createElement(
      'div',
      { 'data-testid': 'language-selector' },
      'Language Selector'
    ),
}));
