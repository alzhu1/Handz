import React from 'react';
import { Redirect } from 'react-router-dom';

import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';

import TextField from 'material-ui/TextField';

import InvalidLoginDialog from 'components/InvalidLoginDialog';

class LoginPage extends React.Component {
    render() {
        if (this.props.is_logged_in) {
            return <Redirect to='/' />;
        }

        let textStyles = {
          // textAlign: 'center'
        }

        return (
            <div>
                <h1 style={textStyles}>Handz!</h1>
                <h2 style={textStyles}>Choose Your Name</h2>
                <form style={textStyles} noValidate autoComplete="off" onSubmit={(e) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
