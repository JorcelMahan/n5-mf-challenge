import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';

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
