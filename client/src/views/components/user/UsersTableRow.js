import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import axios from 'axios';
import { Button,  Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


 class UsersTableRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            danger: false,
          };

         this.toggleDanger = this.toggleDanger.bind(this);
         this.toggle = this.toggle.bind(this);
         
    }
    
  
    onSubmit(e) {
        e.preventDefault();
      // Redirect to Dashboard
      this.props.history.push('/dashboard')
    
      }

    deleteUser() {
        axios.delete('/api/user/delete/' + this.props.obj._id)
            .then((res) => 
            console.log('User successfully deleted!')
            ).catch((error) => {
                console.log(error)
            })

    // Redirect to Dashboard
       //this.props.history.push('/dashboard' );
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

    render() {
      
        return (
            <tr>
              {/* <td>{this.props.obj._id}</td> */}
                <td>{this.props.obj.username}</td>
                <td>
                <Moment format="'DD/MM/YYYY''LTS'">{this.props.obj.Created_at}</Moment></td>
                 <td>
                    <Link className="edit-link" to={"update-user-password/" + this.props.obj._id}>
                          تغيير كلمة السر 
                    </Link>
                    </td>
                    <td>
                    <Button color="danger" onClick={this.toggleDanger} className="mr-1">حذف</Button></td>
                            <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
                                className={'modal-danger ' + this.props.className}>
                            <ModalHeader toggle={this.toggleDanger}></ModalHeader>
                            <ModalBody><font size="6" text="center">هل تريد الحذف ؟</font></ModalBody>
                            <ModalFooter>
                                <Button color="danger" 
                                onClick={() => {
                                    this.deleteUser();
                                    this.toggleDanger();
                                    window.location.href='/dashboard'
                                }}
                                >حذف </Button>
                                <Button color="secondary" onClick={this.toggleDanger}>الغاء</Button>
                            </ModalFooter>
                            </Modal>
                        </tr>
        );
    }
}
export default UsersTableRow;