import axios from 'axios';

import {
  GET_EXPENSES,
  GET_ERRORS
} from './types';

  export const getExpenses = (data) => dispatch => {
    axios
      .get('/api/expenses/all'+ this.props.location.search, data)
      .then(res =>
        dispatch({
          type: GET_EXPENSES,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
