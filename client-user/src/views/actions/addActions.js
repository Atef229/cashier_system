import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';


// add Category
export const addCategory = (data,history) => dispatch => {
  axios
    .post('/api/category/add', data)
    .then(res => history.push('/dashboard')
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// add SubCategory
export const addSubCategory = (data,history) => dispatch => {
  axios
    .post('/api/subcategory/add', data)
    .then(res => history.push('/dashboard')
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// add product
export const addProduct = (data,history) => dispatch => {
  axios
    .post('/api/product/add', data)
    .then(res => history.push('/dashboard')
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// add expenses
export const addExpenses = (data,history) => dispatch => {
  axios
    .post('/api/expenses/add', data)
    .then(res => history.push('/dashboard')
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// add cart
export const addCart = (data) => dispatch => {
  axios
    .post('/api/cart/add', data)
    .then(res => {
      // const { items } = res.data;
      //console.log(res.data);

          })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// add order
export const addorder = (data) => dispatch => {
  axios
    .post('/api/order/add', data)
    .then(res => console.log("Done")
    )
    .catch(err =>
      console.log(err)
    );
};
