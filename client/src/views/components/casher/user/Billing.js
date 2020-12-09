import React, { Component } from 'react';
import axios from 'axios';
import { CardBody, CardFooter, Button, Col, Row, Table } from 'reactstrap';
import { Card } from 'react-bootstrap';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import BillingTableRow from './BillingTableRow';
import Header from '../../../../containers/user/DefaultLayoutUser/DefaultHeader';
import DefaultFooter from '../../../../containers/user/DefaultLayoutUser/DefaultFooter';
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
import navigation from '../../../../nav_user';

class Billing extends Component {

    constructor(props) {
      super(props)
      this.state = {
        orders: [],
        order: []
      };
      
    }
  
  
  
    componentDidMount() {
      axios.get('/api/order/last')
      .then(res => {
        this.setState({
          orders: [res.data]
          
        });
        console.log(this.state.orders);  
      })
        .catch((error) => {
          console.log(error);
        })

        axios.get('/api/order/last')
        .then(res => {
          this.setState({
            order: res.data
            
          });
        })
          .catch((error) => {
            console.log(error);
          })
      
    }
    
  
    DataTable() {
      return this.state.orders.map((res, i) => {
        return <BillingTableRow obj={res} key={i} />;
        
      });
    }

    deleteCart() {
      axios.delete(`/api/cart/delete`)
          .then((res) => 
          console.log('Cart successfully deleted!')
          ).catch((error) => {
              console.log(error)
          })

  // Redirect to Dashboard
     //this.props.history.push('/dashboard' );
  }

    bill() {
      window.print();
    }
  
    render() {


      var style = {
        marginTop:"90px"
      }

      const { isAuthenticated, user } = this.props.auth;

      var style1 = {
      textAlign: "center"
      }
      var style2 = {
        fontWeight: "bold"
      
      }

      var style3 = {
        display: "inline-block",
        // width: "calc(50% - 4px)",
        float: "left",
        lineHeight:"25px",
        margin: "0 auto"
      
      }

      var button = {

        margin: "0 4px",
     
     }
     var table = {
      textAlign: "center",
      borderCollapse: "collapse",
      fontFamily: "arial, sans-serif",
      borderCollapse: "collapse",
      width: "70%",
      marginLeft:"auto",
      marginRight:"auto"
    }

    var td = {
      border: "1px solid black"
    }

      return (
        <div className="app">
        <AppHeader> 
         <Header />
      </AppHeader>
      <div className="app-body">
          <AppSidebar  display="lg">
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
                <h7 dir="rtl"> اسم المستخدم: {user.username}</h7>
                </div>
                {/* <Table  bordered responsive size="sm" dir="rtl"> */}
                <table dir="rtl" style={table}>
                  <thead style={td}>
                  <tr style={td}>
                  <th style={td}>الصنف</th>
                  <th style={td}>السعر</th>
                  <th style={td}>الكمية</th>
                  <th style={td}>الأجمالى</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.DataTable()}
                  </tbody>
                  </table>

                {/* </Table> */}
              </CardBody>
              </div>
              <CardFooter>
                <Button block color="secondary" onClick={() => {
                print_specific_div_content();
                this.deleteCart();
              }}
                >طباعه</Button>
                </CardFooter>
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
  function print_specific_div_content(){
    var win = window.open('','','left=0,top=0,width=400,height=300,toolbar=0,scrollbars=0,status =0');
    var handler = function() {
      win.print();
      win.close();
    };
    if(win.addEventListener)
        win.addEventListener('load', handler, false);
    else if(win.attachEvent)
        win.attachEvent('onload', handler, false);

    var content = "<html>";
    var content = document.getElementById("divToPrint").innerHTML ;
    content += "</body>";
    content += "</html>";
    win.document.write(content);
    win.document.close();
}

  Billing.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
  });
  
  export default connect(mapStateToProps)(withRouter(Billing));