import React, { Component } from 'react';
import { CardBody, CardFooter, Col, Row, Button } from 'reactstrap';
import { Card } from 'react-bootstrap';
import Moment from 'react-moment';
import Header from '../../containers/DefaultLayout/DefaultHeader';
import DefaultFooter from '../../containers/DefaultLayout/DefaultFooter';
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
import navigation from '../../_nav';

class ContactME extends Component {
  
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
          <AppSidebar fixed display="lg">
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
                <h6 style={style2}>Cashier System</h6>
                <br />
                <h7>Created by : Hexacode</h7>
                <br />
                <h7>Email : info@hexacode.net</h7>
                <br />
                <h7>Website : <a href="https://hexacode.net">hexacode.net</a></h7>
                <br />
                <br />
                <Button size="lg" className="btn-linkedin btn-brand mr-1 mb-1" onClick={() => {window.location.href="https://www.linkedin.com/company/hexacodenet/"}}><i className="fa fa-linkedin"></i></Button>
                <Button size="lg" className="btn-twitter btn-brand mr-1 mb-1" onClick={() => {window.location.href="https://twitter.com/hexacode_net"}}><i className="fa fa-twitter"></i></Button>
                <Button size="lg" className="btn-facebook btn-brand mr-1 mb-1" onClick={() => {window.location.href="https://www.facebook.com/hexacode.net"}}><i className="fa fa-facebook"></i></Button>
                </div>
              </CardBody>
              </div>
              <CardFooter>
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
  
  export default ContactME;