import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../views/actions/authActions';
import { clearCurrentProfile } from '../../../views/actions/AdminsActions';
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Progress } from 'reactstrap';
import { Link } from 'react-router-dom';

const propTypes = {
  notif: PropTypes.bool,
  accnt: PropTypes.bool,
  tasks: PropTypes.bool,
  mssgs: PropTypes.bool,
};
const defaultProps = {
  notif: false,
  accnt: false,
  tasks: false,
  mssgs: false,
};

class DefaultHeaderDropdown extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  
  dropAccnt() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav dir="ltr">
          <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center"><strong>{user.username} مرحبا</strong></DropdownItem>
          <DropdownItem><i className="fa fa-lock" onLogoutClick={this.onLogoutClick.bind(this)}></i> تسجيل خروج </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  render() {
    const { notif, accnt, tasks, mssgs } = this.props;
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <DropdownMenu right>
                    <DropdownItem header tag="div" className="text-center"><strong>Welcome {user.username}</strong></DropdownItem>
                    <DropdownItem onLogoutClick={this.onLogoutClick.bind(this)}><i className="fa fa-lock"></i> Logout</DropdownItem>
              </DropdownMenu>
          );
              
          const guestLinks = (
                <Link className="nav-link" to="/admin-login">
                login
                </Link>
      
      
          );
          
    return (
        notif ? this.dropNotif() :
          accnt ? this.dropAccnt() :
            tasks ? this.dropTasks() :
              mssgs ? this.dropMssgs() : null
    );
    <div>{isAuthenticated ? authLinks : guestLinks}</div>
  }
}

DefaultHeaderDropdown.propTypes = propTypes;
DefaultHeaderDropdown.defaultProps = defaultProps;

DefaultHeaderDropdown.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  DefaultHeaderDropdown
);