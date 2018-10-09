'use strict';

/**
 * Библиотека JS
 *
 * @type {{getLocalGeo: function(number), getLocalPlaces: function(): {predictions: *[], status: string}}}
 */
module.exports = {
  /**
   * Геттер данных геолокации с учетом запроса "Санкт". Имитация получения данных от Google Map.
   * @param {number} variant - номер для имиатции получения разного значения геолокации. В качестве значения может
   * выступать номер выбранной подсказки от текстового поля
   * @returns {{results: *[], status: string}}
   */
  getLocalGeo: variant => {
    const differenceLatIng = 2 * variant; // for imitation difference in offline mode

    return {
      'results': [
        {
          'address_components': [
            {
              'long_name': 'Санкт-Петербург',
              'short_name': 'СПБ',
              'types': ['locality', 'political']
            },
            {
              'long_name': 'Санкт-Петербург',
              'short_name': 'Санкт-Петербург',
              'types': ['administrative_area_level_2', 'political']
            },
            {
              'long_name': 'Россия',
              'short_name': 'RU',
              'types': ['country', 'political']
            }
          ],
          'formatted_address': 'Санкт-Петербург, Россия',
          'geometry': {
            'bounds': {
              'northeast': {
                'lat': 60.233527 + differenceLatIng,
                'lng': 30.7349362 + differenceLatIng
              },
              'southwest': {
                'lat': 59.6468681 + differenceLatIng,
                'lng': 29.4464432 + differenceLatIng
              }
            },
            'location': {
              'lat': 59.9342802 + differenceLatIng,
              'lng': 30.3350986 + differenceLatIng
            },
            'location_type': 'APPROXIMATE',
            'viewport': {
              'northeast': {
                'lat': 60.233527 + differenceLatIng,
                'lng': 30.7349362 + differenceLatIng
              },
              'southwest': {
                'lat': 59.6468681 + differenceLatIng,
                'lng': 29.4464432 + differenceLatIng
              }
            }
          },
          'place_id': 'ChIJ7WVKx4w3lkYR_46Eqz9nx20',
          'types': ['locality', 'political']
        }
      ],
      'status': 'OK'
    }
  },

  /**
   * Геттер списка подсказок с учетом запроса "Санкт". Имитация получения подсказок от Google Map
   * @returns {{predictions: *[], status: string}}
   */
  getLocalPlaces: () => ({
    'predictions': [
      {
        'description': 'Санкт-Петербург, Россия',
        'id': '25582cd056adf792d97a947b79dd45f4eb2de6a0',
        'matched_substrings': [{'length': 5, 'offset': 0}],
        'place_id': 'ChIJ7WVKx4w3lkYR_46Eqz9nx20',
        'reference': 'ChIJ7WVKx4w3lkYR_46Eqz9nx20',
        'structured_formatting': {
          'main_text': 'Санкт-Петербург',
          'main_text_matched_substrings': [{'length': 5, 'offset': 0}],
          'secondary_text': 'Россия'
        },
        'terms': [{'offset': 0, 'value': 'Санкт-Петербург'}, {'offset': 17, 'value': 'Россия'}],
        'types': ['locality', 'political', 'geocode']
      },
      {
        'description': 'Санкт-Петербургское шоссе, Санкт-Петербург, Россия',
        'id': 'e93f154cd0aae1f121e8d9a6744abb01a0f1dd0c',
        'matched_substrings': [{'length': 5, 'offset': 0}],
        'place_id': 'El3QodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQs9GB0LrQvtC1INGI0L7RgdGB0LUsINCh0LDQvdC60YIt0J_QtdGC0LXRgNCx0YPRgNCzLCDQoNC-0YHRgdC40Y8',
        'reference': 'El3QodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQs9GB0LrQvtC1INGI0L7RgdGB0LUsINCh0LDQvdC60YIt0J_QtdGC0LXRgNCx0YPRgNCzLCDQoNC-0YHRgdC40Y8',
        'structured_formatting': {
          'main_text': 'Санкт-Петербургское шоссе',
          'main_text_matched_substrings': [{'length': 5, 'offset': 0}],
          'secondary_text': 'Санкт-Петербург, Россия'
        },
        'terms': [{'offset': 0, 'value': 'Санкт-Петербургское шоссе'}, {
          'offset': 27,
          'value': 'Санкт-Петербург'
        }, {'offset': 44, 'value': 'Россия'}],
        'types': ['route', 'geocode']
      },
      {
        'description': 'Санкт-Петербург Ла́дожский, Бухарестская улица, Санкт-Петербург, Россия',
        'id': 'dd334c2770f656b0d3dbbe48b9f47577a0de22bd',
        'matched_substrings': [{'length': 5, 'offset': 0}],
        'place_id': 'ChIJS4jfNB0ulkYR8eK001vh9rs',
        'reference': 'ChIJS4jfNB0ulkYR8eK001vh9rs',
        'structured_formatting': {
          'main_text': 'Санкт-Петербург Ла́дожский',
          'main_text_matched_substrings': [{'length': 5, 'offset': 0}],
          'secondary_text': 'Бухарестская улица, Санкт-Петербург, Россия'
        },
        'terms': [{'offset': 0, 'value': 'Санкт-Петербург Ла́дожский'}, {
          'offset': 28,
          'value': 'Бухарестская улица'
        }, {'offset': 48, 'value': 'Санкт-Петербург'}, {'offset': 65, 'value': 'Россия'}],
        'types': ['transit_station', 'point_of_interest', 'establishment', 'geocode']
      },
      {
        'description': 'Санкт-Мориц, Швейцария',
        'id': '874f862906c7a2b970309b194e50d3e88e05425a',
        'matched_substrings': [{'length': 5, 'offset': 0}],
        'place_id': 'ChIJexrAbQeChEcRJXjJPr3bnyc',
        'reference': 'ChIJexrAbQeChEcRJXjJPr3bnyc',
        'structured_formatting': {
          'main_text': 'Санкт-Мориц',
          'main_text_matched_substrings': [{'length': 5, 'offset': 0}],
          'secondary_text': 'Швейцария'
        },
        'terms': [{'offset': 0, 'value': 'Санкт-Мориц'}, {'offset': 13, 'value': 'Швейцария'}],
        'types': ['locality', 'political', 'geocode']
      },
      {
        'description': 'Санкт-Галлен, Швейцария',
        'id': '1cf0f3caafee33a7a97ea21eaa0f55bbd2216f87',
        'matched_substrings': [{'length': 5, 'offset': 0}],
        'place_id': 'ChIJVdgzdikem0cRFGH-HwhQIpo',
        'reference': 'ChIJVdgzdikem0cRFGH-HwhQIpo',
        'structured_formatting': {
          'main_text': 'Санкт-Галлен',
          'main_text_matched_substrings': [{'length': 5, 'offset': 0}],
          'secondary_text': 'Швейцария'
        },
        'terms': [{'offset': 0, 'value': 'Санкт-Галлен'}, {'offset': 14, 'value': 'Швейцария'}],
        'types': ['locality', 'political', 'geocode']
      }
    ],
    'status': 'OK'
  }),
};