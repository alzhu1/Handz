import React from 'react';
import { Redirect, Link } from 'react-router-dom';

export default class Signup extends React.Component {


    render() {
        if (this.props.redirect) {
            return (
                <Redirect to={{
                    pathname: '/login',
                    state: {success: true}
                }} />
            );
        }
        return (
            <div>
                <h1>This is the Signup page!</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                     this.props.createUser(this.props.username,
                                     this.props.password,
                                     this.props.password2);
                }}>
                    <p><label>
                        Username:
                        <input type="text" value={this.props.username} onChange={this.props.changeName} />
                    </label></p>

                    <p><label>
                        Password:
                        <input type="password" value={this.props.password} onChange={this.props.changePassword} />
                    </label></p>

                    <p><label>
                        Confirm Password:
                        <input type="password" value={this.props.password2} onChange={this.props.changePassword2} />
                    </label></p>
                    <input type="submit" value="Submit" />
                </form>

                <Link to='/login'>Back to login</Link>
            </div>
        );
    }
}
