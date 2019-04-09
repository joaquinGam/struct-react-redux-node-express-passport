import React, { Component } from 'react';
// import Create from './UserCreate';
// import Login from './UserLogin';
// import Logout from './UserLogout';

class Ticket extends Component {
  render() {
    let template = (() => <h2>ERROR 404: NO ENCONTRADO</h2>);
    switch (this.props.match.params.option) {
      case 'create':
        template = (() => <Create />); break;
      case 'search':
        if (this.props.match.params.id !== undefined)
          template = (() => <ViewOne id={this.props.match.params.id} />);
        else
          template = (() => <Search />);
        break;
      default:
        template = (() => <h2>ERROR 404: NO ENCONTRADO</h2>); break;
    }
    return (
      <div>
        {template()}
      </div>
    );
  }
}

export default Ticket;
