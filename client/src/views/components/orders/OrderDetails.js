import React, { Component } from 'react';
import axios from 'axios';
import { CardBody, Col, Row, Table } from 'reactstrap';
import { Card } from 'react-bootstrap';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import OrderDetailsTableRow from './OrderDetailsTableRow';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import DefaultFooter from '../../../containers/DefaultLayout/DefaultFooter';
import {
  AppHeader,
  AppFooter,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
import navigation from '../../../_nav';

class OrderDetails extends Component {

    constructor(props) {
      super(props)
      this.state = {
        orders: [],
        order: []
      };
      
    }
  
  
  
    componentDidMount() {
      axios.get('api/order/orders/'+ this.props.match.params.order_id)
      .then(res => {
        this.setState({
          orders: [res.data[0]]
          
        });
        console.log(this.state.orders);  
      })
        .catch((error) => {
          console.log(error);
        })

        axios.get('api/order/orders/'+ this.props.match.params.order_id)
        .then(res => {
          this.setState({
            order: res.data[0]
            
          });
          console.log(this.state.order);  
        })
          .catch((error) => {
            console.log(error);
          })
      
    }
    componentWillUnmount() {
      this.state.orders,
      this.state.order
      
        }
    
  
    DataTable() {
      return this.state.orders.map((res, i) => {
        return <OrderDetailsTableRow obj={res} key={i} />;
        
      });
    }

  
    render() {


      var style = {
        marginTop:"20px"
      }

      var style1 = {
      textAlign: "center"
      }
      var style2 = {
        fontWeight: "bold"
      
      }

      return (
        <div className="app">
        <AppHeader> 
         <Header />
      </AppHeader>
      <div className="app-body">
          <AppSidebar display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar> 
        <div className="animated fadeIn  justify-content-center"className="main">
        <Card className="bg-dark text-white">
          <Card.Img src={'../../assets/img/joker.jpg'} //"https://merntask.s3.us-east-2.amazonaws.com/123456.jpg"
          alt="Card image"  height="350" width="130" />
          <Card.ImgOverlay>
          </Card.ImgOverlay>
        </Card>
        <Row className="justify-content-center">
          {/* <Col md="9" lg="7" xl="4"> */}
          <Col xs="9" sm="6" md="4">
            <Card className="mx-3" style={style}>
            <div  id="divToPrint">
              <CardBody>
                {/* <div> */}
                <div style={style1}>
                <h6 style={style2}>Joker</h6>
                <h7>فرع العاشر من رمضان</h7>
                <br />
                <h7>رقم الفاتورة: {this.state.order.order_id}</h7>
                <br />
                <br />
                <h7 > التاريخ: <Moment format="DD/MM/YYYY">{this.state.order.Created_at}</Moment></h7>
                <br />
                <h7 dir="rtl"> الوقت:<Moment format="LTS">{this.state.order.Created_at}</Moment></h7>
                <br />
                <h7 dir="rtl"> اسم المستخدم: {this.state.order.user}</h7>
                </div>
                <Table  bordered responsive size="sm" dir="rtl">
                  <thead>
                  <tr>
                  <th>الصنف</th>
                  <th>السعر</th>
                  <th>الكمية</th>
                  <th>الأجمالى</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.DataTable()}
                  </tbody>
                </Table>
              </CardBody>
              </div>
            </Card>
            </Col>
        </Row>
            </div>
      </div>
      <AppFooter fixed>
          <DefaultFooter />
        </AppFooter>
      </div>
      );
    }
  }

  OrderDetails.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
  });
  
  export default connect(mapStateToProps)(withRouter(OrderDetails));