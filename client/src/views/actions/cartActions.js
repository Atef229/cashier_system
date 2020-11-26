import axios from 'axios';

import {
  // GET_CART,
  GET_CART,
  GET_ERRORS
} from './types';

// Get current profile
export const allcart = () => dispatch => {
  dispatch();
  axios
    .get('/api/cart/all')
    .then(res =>{
      const { items } = res.data;
      // Set items to ls
      localStorage.setItem('cartall', items);
      dispatch({
        type: GET_CART,
        payload: res.data
      })}
    )
    .catch(err =>
      dispatch({
        type: GET_CART,
        payload: null
        //payload: err.response.data
      })
    );
};


// export const updateproduct = (profileData) => dispatch => {
//     axios
//       .put('/api/product/update/'+ this.props.match.params.product_id, profileData)
//       .then(res =>
//         dispatch({
//           type: GET_CART,
//           payload: res.data
//         })
//       )
//       .catch(err =>
//         dispatch({
//           type: GET_ERRORS,
//           payload: err.response.data
//         })
//       );
//   };
  
//   export const getById = (profileData) => dispatch => {
//     axios
//       .get('/api/product/'+ this.props.match.params.product_id, profileData)
//       .then(res =>
//         dispatch({
//           type: GET_CART,
//           payload: res.data
//         })
//       )
//       .catch(err =>
//         dispatch({
//           type: GET_ERRORS,
//           payload: err.response.data
//         })
//       );
//   };

//   export const search = (data) => dispatch => {
//     axios
//       .get('/api/product/search/'+ this.props.match.params.name, data)
//       .then(res =>
//         dispatch({
//           type: GET_CART,
//           payload: res.data
//         })
//       )
//       .catch(err =>
//         dispatch({
//           type: GET_ERRORS,
//           payload: err.response.data
//         })
//       );
//   };
