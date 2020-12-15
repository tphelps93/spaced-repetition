import React from 'react';

const DataContext = React.createContext({
  language: [],
  words: [],
  totalScore: 0,
  incorrect: 0,
  correct: 0,
  hasError: null,
});

export default DataContext;
