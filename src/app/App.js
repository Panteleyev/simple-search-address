/**
 * Главный компонент приложения
 */
import React from 'react';
import axios from 'axios';
import axiosCancel from 'axios-cancel';
import classNames from 'classnames';
import logo from '../logo.svg';
import styles from './App.scss';
import MapBox from './MapBox/MapBox.js';
import SearchBox from './SearchBox/SearchBox';
import {getLocalGeo} from './common/js/data';
import {CLIENT_API_KEY, HINT_MAX_COUNT, IS_DEMO_MODE} from './common/js/settings';

axiosCancel(axios, {
  debug: false
});

const ERR_MSG_FOR_USER = 'Error get data';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.requestID = 'place';
    this.state = {
      ...this.getGeoLocationDef(),
      error: false,
      message: '',
    };
  }

  componentDidCatch(error, info) {
    this.setState({error, info});
  }

  /**
   * Геттер геолокационных данных по-умолчанию
   * @returns {{lat: number, lng: number}}
   */
  getGeoLocationDef = () => ({
    lat: 40.756795,
    lng: -73.954298
  });

  /**
   * Сеттер сообщения
   * @param {string} message - текст сообщения
   */
  setMessage = message => this.setState({message: message});

  /**
   * Функция очистки сообщения
   */
  clearMessage = () => this.setMessage('');

  /**
   * Функция отображения сообщения
   * @param {string} text4user - текст сообщения для пользователя
   * @param {string} text4console - текст сообщения для консоли
   * @param fullData - данные, плдученные от сервера
   */
  doShowMessage = (text4user, text4console, fullData) => {
    this.setMessage(text4user);

    if (typeof fullData !== 'undefined') {
      console.log(text4console, fullData);
    } else {
      console.log(text4console);
    }
  };

  /**
   * Парсер подсказок для вывода списка подсказок
   * @param {{predictions: *[], status: string}} hints - данные о подсказках мест
   * @returns {Promise<Array>}
   */
  parsePlacesForListHints = async hints => {
    let result = [];

    if (
      (hints.hasOwnProperty('status') && hints.status !== 'OK') ||
      !hints.hasOwnProperty('predictions')
    ) {
      this.doShowMessage(ERR_MSG_FOR_USER, 'Error parse places', hints);
      throw new Error('Error parse Places');
    }

    hints.predictions.filter(hint =>
      result.length < HINT_MAX_COUNT ?
        result.push({value: hint.description}) :
        false
    );
    this.clearMessage();

    return result;
  };

  /**
   * Геттер подсказок. Формирует запрос и получает список подсказок
   * @param {string} value - запрошенное значение
   * @returns {Promise<Array>}
   */
  getPlacesHints = async value => {
    this.request = await axios(
      '/maps/api/places/json?' +
      'mode=' + (IS_DEMO_MODE ? 0 : 1) +
      '&value=' + encodeURIComponent(value),
      {
        requestId: this.requestID
      }
    );
    const body = await this.request.data;//json();

    return this.parsePlacesForListHints(body);
  };

  /**
   * Геттер геолокации с учетом режима приложения
   * @param {{index: number, value: string}} data - данные о выбранном месте
   * @param callbackFunc - колбэк
   * @returns {Promise<void>}
   */
  getGeo = async (data, callbackFunc) => {
    if (
      data.hasOwnProperty('index') ||
      data.hasOwnProperty('value')
    ) {
      let geoData;

      if (!IS_DEMO_MODE) {
        axios.cancel(this.requestID);
        await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?key=${CLIENT_API_KEY}&address=${encodeURIComponent(data.value)}`
        )
          .then(res => res.json())
          .then(json => {
            !json.hasOwnProperty('status') || json.status !== 'OK' ?
              this.doShowMessage(ERR_MSG_FOR_USER, 'Unknown data of geocode', json) :
              callbackFunc(json.results[0].geometry.location);
          })
          .catch(error => {
            this.doShowMessage(ERR_MSG_FOR_USER, 'Error geocode', error);
          });
      } else {
        geoData = getLocalGeo(data.index);
        callbackFunc(geoData.results[0].geometry.location);
      }
    }
  };

  /**
   * Функция релокации с учетом выбранных данных о месте
   * @param {{index: number, value: string}} data - данные о выбранном месте
   */
  doUpdateGeoLocation = async data => {
    await this.getGeo(data, this.setGeoLocation);
  };

  /**
   * Сеттер геолокации
   * @param {{results: *[], status: string}} location - данные о геолокации
   */
  setGeoLocation = location => {
    if (location.hasOwnProperty('lat') && location.hasOwnProperty('lng')) {
      this.setState({
        lat: location.lat,
        lng: location.lng,
        message: '',
      });
    } else {
      this.doShowMessage(ERR_MSG_FOR_USER, 'Error data for relocation');
    }
  };

  /**
   * Функция очистки формы
   */
  resetForm = () => {
    this.setState({
      ...this.getGeoLocationDef(),
      message: '',
    })
  };

  render() {
    if (this.state.info && this.state.info.componentStack) {
      console.log(this.state.info.componentStack);
    }

    if (this.state.error) {
      return <h2>Error: {this.state.error.toString()}</h2>;
    }

    return (
      <div className={styles.App}>
        <header className={styles.header}>
          <img className={styles.logo} src={logo} alt="logo"/>
          <h1 className={classNames({
            [styles.title]: true,
            [styles.demo]: IS_DEMO_MODE
          })}>Welcome to Map project</h1>
        </header>
        <div className={styles['search-box']}>
          <div className={styles.wrapper}>
            <SearchBox
              getHints={this.getPlacesHints}
              doUpdateGeoLocation={this.doUpdateGeoLocation}
              doReset={this.resetForm}
              message={this.state.message}
            />
          </div>
        </div>
        <div className={styles['map-box']}>
          <div className={styles.wrapper}>
            <MapBox lat={this.state.lat} lng={this.state.lng}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
