'use strict';

/**
 * Настройка приложения
 *
 * @type {{IS_DEMO_MODE: boolean, HINT_COUNT: number}}
 */
module.exports = {
  /**
   * API ключ для получения Geo, списка подсказок от Google Map
   */
  CLIENT_API_KEY: 'API_KEY',

  /**
   * Приложение в demo режиме? Если да (значение true), то отправляются запросы на сервер Google.
   * (!) В случае, если приложение не в демо-режиме, то могут быть ограничения с квотой применения API.
   * В ознакомительных целях рекомендуется demo режим (значение false). В demo режиме данные геолокации
   * будут браться с getLocalGeo
   * @type {boolean}
   */
  IS_DEMO_MODE: true,

  /**
   * Количество подсказок в выпадающем списке
   * @type {number}
   */
  HINT_MAX_COUNT: 6,
};