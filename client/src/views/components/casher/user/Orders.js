import React, { Component } from 'react';
import axios from 'axios';
import {Label, FormGroup, Button, Card, CardBody, Form, Input, Table} from 'reactstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import OrderTableRow from './OrderTableRow';
import { addorder } from '../../../actions/addActions';

class Orders extends Component {

    constructor(props) {
      super(props)
      this.state = {
        notes: '',
        product: '',
        totalPrice: '',
        total_Wholesale_price: '',
        Profit: '',
        products: '',
        order: [],
        orders: [],
        total:[],
        modal: false,
        danger: false
      };

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.toggleDanger = this.toggleDanger.bind(this);
      this.toggle = this.toggle.bind(this);
      this.toggleSmall = this.toggleSmall.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

      componentDidMount() {
        axios.get('/api/cart/all')
          .then(res => {
            this.setState({
              order: res.data
              
            });  
          })
          .catch((error) => {
            console.log(error);
          })

          axios.get('/api/cart/carts')
          .then(res => {
            this.setState({
              orders: res.data
              
            })
            console.log(this.state.orders);
            // var items = res.data;
            // console.log(res.data);
            // //items[0] = prompt("are you sure?");
            //       // Set items to ls
            //       localStorage.setItem("CartAll", JSON.stringify(items));
            //        this.state.storedItems.items = JSON.parse(localStorage.getItem("CartAll"));
            //       console.log(this.state.storedItems);    
          })
          .catch((error) => {
            console.log(error);
          })

      }

      componentWillReceiveProps(nextProps) {  
        if (nextProps.allcart) {
          this.setState({ allcart: nextProps.allcart });
        }
      }
    
  
    DataTable() {
      return this.state.order.map((res, i) => {
        return <OrderTableRow obj={res} key={i} />;
        
      });
    }

    toggle() {
      this.setState({
        modal: !this.state.modal,
      });
    }

  toggleDanger() {
      this.setState({
        danger: !this.state.danger,
      });
    }
    toggleSmall() {
      this.setState({
        small: !this.state.small,
      });
    }

    onSubmit(e) {
      e.preventDefault();
      const { isAuthenticated, user } = this.props.auth;
      const { allcart } = this.props.allcart;
    //         for (const key of Object.keys(this.state.orders.items)) {
    //     ( this.state.products)
    // }
     this.state.totalPrice = this.state.orders.items.reduce((total, items) => total + items.totalPrice, 0);
     this.state.total_Wholesale_price = this.state.orders.items.reduce((total, items) => total + items.total_Wholesale_price, 0);
    console.log(this.state.totalPrice);
    console.log(this.state.products);
      const data = {
        
        user:user.username,
        notes: this.state.notes,
        products: this.state.orders.items,
        totalPrice:this.state.totalPrice,
        Profit:this.state.totalPrice - this.state.total_Wholesale_price
      };
      this.props.addorder(data);
  }
  
  
    render() {
      //console.log(this.totalPrice());
      return (
            <div >
            <Card className="mx-4">
              <CardBody>
                <Table hover bordered striped responsive size="md">
                  <thead>
                  <tr>
                  <th>الصنف</th>
                  <th>السعر</th>
                    <th>الكمية</th>
                    <th>الاجمالى</th>
                    <th>حذف</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.DataTable()}
                  </tbody>
                </Table>
                <Form noValidate onSubmit={this.onSubmit}>
                <FormGroup>
                      <Label htmlFor="text">ملاحظات</Label>
                      <Input 
                      type="text" 
                      placeholder="ملاحظات"
                      name="notes" 
                      value={this.state.notes}
                      onChange={this.onChange}
                      />
                      </FormGroup>
                <Button type="submit" active block color="info" block onClick={() => window.location.href='/user/billing'} >أضافة الاوردر</Button>
                  </Form>
              </CardBody>
            </Card>
      </div>
      );
    }
  }

  Orders.propTypes = {
    addorder: PropTypes.func.isRequired,
    allcart: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    allcart: state.allcart,
  });
  
  export default connect(mapStateToProps, { addorder })(withRouter(Orders));