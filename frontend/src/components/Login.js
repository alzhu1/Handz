import React from 'react';
import { Redirect, Link } from 'react-router-dom';


export default class Login extends React.Component {

    render() {
        
        if (this.props.logged_in===true) {
            return <Redirect to='/' />;
        }

        return (
            <div>
                <h1>This is the Login page!</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.login(this.props.username, this.props.password);
                }}>
                    <p><label>
                        Username:
                        <input type="text" value={this.props.username}
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
