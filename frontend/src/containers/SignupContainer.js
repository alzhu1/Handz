import React from 'react';
import Signup from 'components/Signup'


export default class SignupContainer extends React.Component {
    constructor() {
        super();
        this.changeName = this.changeName.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePassword2 = this.changePassword2.bind(this);

        this.state = {
            name: "",
            password: "",
            password2: "",
        };
    }

    changeName(event) {
        this.setState({name: event.target.value});
    }

    changePassword(event) {
        this.setState({password: event.target.value});
    }

    changePassword2(event) {
        this.setState({password2: event.target.value});
    }

    render() {
      return(
        <div>
          <Signup name={this.state.name}
                  password={this.state.password}
                  password2={this.state.password2}
                  changeName={this.changeName}
                  changePassword={this.changePassword}
                  changePassword2={this.changePassword2}/>
          </ div>
      )
    }
}
