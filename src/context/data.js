import React from 'react';

const controls = [
    {
      text: 'Slow',
      value: 'slow',
      pattern: ''
  },
  {
      text: 'Easy',
      value: 'easy',
      pattern: ''
  },
  {
      text: 'Fast',
      value: 'fast',
      pattern: ''
  },
  {
      text: 'Wild',
      value: 'wild',
      pattern: ''
  }
]

export default React.createContext({
  controls
});

export { controls };