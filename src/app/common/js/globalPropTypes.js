/**
 * Библиотека PropTypes
 */
import {func, string} from 'prop-types';

/**
 * PropTypes для компонента SearchBox
 * @type {{getHints: *, doUpdateGeoLocation: *, doReset: *, message: *}}
 */
export const SEARCH_BOX_PROP_TYPES = {
  getHints: func.isRequired,
  doUpdateGeoLocation: func.isRequired,
  doReset: func.isRequired,
  message: string,
};