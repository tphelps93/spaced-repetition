import React, { Component } from 'react';

const DataContext = React.createContext({
  language: [],
  words: [],
  setLanguage: () => {},
  setWords: () => {},
});

export default DataContext;

export class DataProvider extends Component {
  constructor(props) {
    super(props);
    const state = {
      language: {},
      words: [],
    };
    this.state = state;
  }

  setLanguage = lang => {
    this.setState({ language: lang });
  };

  setWords = words => {
    this.setState({ words });
  };

  render() {
    const value = {
      language: this.state.language,
      words: this.state.words,
      setLanguage: this.setLanguage,
      setWords: this.setWords,
    };

    return (
      <DataContext.Provider value={value}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
