import axios from 'axios';

import {
  GET_ORDERS,
  GET_ORDER_BY_ID,
  GET_ERRORS
} from './types';

  
  export const getByuserId = (profileData) => dispatch => {
    axios
      .get('/api/order/'+ this.props.match.params.owner_id, profileData)
      .then(res =>
        dispatch({
          type: GET_ORDERS,
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

  export const getOrders = (data) => dispatch => {
    axios
      .get('/api/order/'+ this.props.location.search, data)
      .then(res =>
        dispatch({
          type: GET_ORDERS,
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

  export const getOrderbyid = (data) => dispatch => {
    axios
      .get('/api/order/'+ this.props.match.params.order_id, data)
      .then(res =>
        dispatch({
          type: GET_ORDER_BY_ID,
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
