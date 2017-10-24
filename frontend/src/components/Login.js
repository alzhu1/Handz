import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';

class Login extends React.Component {
    render() {
        if (this.props.is_logged_in) {
            return <Redirect to='/' />;
        }
        return (
            <div>
                <h1>This is the Login page!</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.loginThunk(this.props.name, this.props.password);
                }}>
                    <p><label>
                        Username:
                        <input type="text"
                        onChange={this.props.changeName} />
                    </label></p>

                    <p><label>
                        Password:
                        <input type="password" value={this.props.password}
                        onChange={this.props.changePassword} />
                    </label></p>

                    <input type="submit" value="Login" />
                </form>
                <Link to='/signup'>Create account</Link>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
