/**
 * Библиотека PropTypes
 */
import {func, string} from 'prop-types';

export const SEARCH_BOX_PROP_TYPES = {
  getHints: func.isRequired,
  doUpdateGeoLocation: func.isRequired,
  doReset: func.isRequired,
  message: string,
};