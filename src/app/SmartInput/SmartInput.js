/**
 * Компонент текстового поля с выпадающим списком подсказок
 */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {SEARCH_BOX_PROP_TYPES} from '../common/js/globalPropTypes';
import AutoSuggest from 'react-autosuggest';
import theme from './SmartInput.scss';

/**
 * Геттер значения в случае нажатия на подсказку
 * @param {{value: string}} suggestion
 */
const getSuggestionValue = suggestion => suggestion.value;

/**
 * Рендер подсказки
 * @param {{value: string}} suggestion - данные о подсказке
 * @returns {*}
 */
const renderSuggestion = suggestion => (
  <div>
    {suggestion.value}
  </div>
);

class SmartInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
      error: false,
    };
  }

  componentDidCatch(error, info) {
    this.setState({error, info});
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.value !== nextProps.value &&
      nextProps.value === ''
    ) {
      this.setState({
        value: ''
      });
    }
  }

  /**
   * Обработчик изменения значения
   * @param event
   * @param {string} newValue - новое значение
   */
  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    });
    this.props.doUpdateTextValue(newValue);
  };

  /**
   * Функция обработки введенного значения и обновления списка подсказок
   * @param {string} value - введенное значение
   */
  onSuggestionsFetchRequested = ({value}) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength >= 3) {
      this.props.getHints(value)
        .then(res => {
            this.setState({
              suggestions: res.filter(hint =>
                hint.value.toLowerCase().slice(0, inputLength) === inputValue
              )
            });
          }
        )
        .catch(thrown =>
          axios.isCancel(thrown) ?
            console.log('Get hints: request cancelled') :
            console.log('Error get hints')
        );
    } else {
      this.setState({suggestions: []});
    }
  };

  /**
   * Функция очистки списка посказок
   */
  onSuggestionsClearRequested = () => {
    this.setState({suggestions: []});
  };

  /**
   * Обработчик выбора подсказки
   * @param event
   * @param {{method: string, sectionIndex: null, suggestion: {value: string}, suggestionIndex: number,
   *        suggestionValue: string}} suggestionData - данные о выбранной подсказке
   */
  onSuggestionSelected = (event, suggestionData) => {
    if (
      suggestionData.suggestion &&
      suggestionData.suggestion.hasOwnProperty('value') &&
      suggestionData.hasOwnProperty('suggestionIndex')
    ) {
      this.props.doUpdateGeoLocation({
        index: suggestionData.suggestionIndex,
        value: suggestionData.suggestion.value
      });
    }
  };

  render() {
    if (this.state.info && this.state.info.componentStack) {
      console.log(this.state.info.componentStack);
    }

    if (this.state.error) {
      return <h2>Error: {this.state.error.toString()}</h2>;
    }

    const {value, suggestions} = this.state;
    const inputProps = {
      placeholder: 'Type a address please',
      value,
      onChange: this.onChange
    };

    return (
      <AutoSuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={this.onSuggestionSelected}
        theme={theme}
      />
    );
  }
}

SmartInput.propTypes = {
  ...SEARCH_BOX_PROP_TYPES,
  value: PropTypes.string.isRequired,
  doUpdateTextValue: PropTypes.func.isRequired,
};

export default SmartInput;