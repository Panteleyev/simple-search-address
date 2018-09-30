/**
 * Компонент формы поиска с подсказкой
 */
import React from 'react';
import SmartInput from '../SmartInput/SmartInput';
import styles from './SearchBox.scss';
import classNames from 'classnames';
import {SEARCH_BOX_PROP_TYPES} from '../common/js/globalPropTypes';

class SearchBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '', // значение для текстового поля поиска
      error: false,
    };
  }

  componentDidCatch(error, info) {
    this.setState({error, info});
  }

  /**
   * Функция сброса данных
   */
  doReset = () => {
    this.setState({
      value: ''
    });
    this.props.doReset();
  };

  /**
   * Функция обновления значения
   * @param {string} value - текстовое значение
   */
  doUpdateTextValue = (value) => {
    this.setState({
      value: value
    });
  };

  render() {
    if (this.state.info && this.state.info.componentStack) {
      console.log(this.state.info.componentStack);
    }

    if (this.state.error) {
      return <h2>Error: {this.state.error.toString()}</h2>;
    }

    const {message} = this.props;

    return (
      <div className={styles['search-box']}>
        <SmartInput {...this.props}
                    value={this.state.value}
                    doUpdateTextValue={this.doUpdateTextValue}
        />
        <div className={styles.cell}>
          <input className={classNames({
            enabled: this.state.value
          })}
                 disabled={!this.state.value}
                 type="button" value="clear" onClick={this.doReset}/>
        </div>
        <div className={classNames({
          [styles['err-msg']]: true,
          [styles.show]: (message)
        })}>{message}</div>
      </div>
    )
  }
}

SearchBox.propTypes = {
  ...SEARCH_BOX_PROP_TYPES
};

export default SearchBox;