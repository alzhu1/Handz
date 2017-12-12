import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import InvalidLoginDialog from 'components/InvalidLoginDialog';

class Login extends React.Component {
    render() {
        if (this.props.is_logged_in) {
            return <Redirect to='/' />;
        }
        return (
            <div>
                <h1>What will your name be?</h1>
                <form noValidate autoComplete="off" onSubmit={(e) => {
                    e.preventDefault();
                    this.props.loginThunk(this.props.name, "fakepassword");
                }}>
                    <TextField
                      id="name"
                      label="Username"
                      margin="normal"
                      helperText="Choose your username"
                      onChange={this.props.changeName}
                    />

                    {/*
                      <p><label>
                          Password:
                          <input type="password" value={this.props.password}
                          onChange={this.props.changePassword} />
                      </label></p>
                      */
                    }

                    <input type="submit" value="Go!" />
                </form>
                {this.props.invalid_login ?  <InvalidLoginDialog /> : ''}

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
