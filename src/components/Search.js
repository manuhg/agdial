import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';

const languages = [
    {
      name: 'C',
      year: 1972
    },
    {
      name: 'C#',
      year: 2000
    },
  ];
  
  function getMatchingLanguages(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    
    if (escapedValue === '') {
      return [];
    }
    
    const regex = new RegExp('^' + escapedValue, 'i');
  
    return languages.filter(language => regex.test(language.name));
  }
  
  /* ----------- */
  /*    Utils    */
  /* ----------- */
  
  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  /* --------------- */
  /*    Component    */
  /* --------------- */
  
  function getSuggestionValue(suggestion) {
    return suggestion.name;
  }
  
  function renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name}</span>
    );
  }
  
  class Search extends Component {
    constructor() {
      super();
  
      this.state = {
        value: '',
        suggestions: [],
        isLoading: false
      };
      
      this.lastRequestId = null;
    }
    
    loadSuggestions(value) {
      // Cancel the previous request
      if (this.lastRequestId !== null) {
        clearTimeout(this.lastRequestId);
      }
      
      this.setState({
        isLoading: true
      });
      
      // Fake request
      this.lastRequestId = setTimeout(() => {
        this.setState({
          isLoading: false,
          suggestions: getMatchingLanguages(value)
        });
      }, 1000);
    }
  
    onChange = (event, { newValue }) => {
      this.setState({
        value: newValue
      });
    };
      
    onSuggestionsFetchRequested = ({ value }) => {
      this.loadSuggestions(value);
    };
  
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };
  
    render() {
      const { value, suggestions, isLoading } = this.state;
      const inputProps = {
        placeholder: "Type 'c'",
        value,
        onChange: this.onChange
      };
      //const status = (isLoading ? 'Loading...' : 'Type to load suggestions');
      
      return (
        <div>
          {/* <div className="status">
            <strong>Status:</strong> {status}
          </div> */}
          <Autosuggest 
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps} />
        </div>
      );
    }
  }
  
export default Search;  