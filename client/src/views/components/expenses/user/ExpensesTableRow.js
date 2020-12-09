import React, { Component } from 'react';
import Moment from 'react-moment';


 class ExpensesTableRow extends Component {
    
  


    render() {
      
        return (
            <tr>
              {/* <td>{this.props.obj._id}</td> */}
                <td>{this.props.obj.username}</td>
                <td>{this.props.obj.cost}</td>
                <td>{this.props.obj.notes}</td>
                <td>
                <Moment format="'DD/MM/YYYY''LTS'">{this.props.obj.Created_at}</Moment></td>
                        </tr>
        );
    }
}
export default ExpensesTableRow;