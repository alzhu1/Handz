import React from 'react';
import {Link} from 'react-router-dom';

import {mapStateToProps, mapDispatchToProps} from 'redux/actions/actions';
import {connect} from 'react-redux';

class Signup extends React.Component {
    render() {
        return (
            <div>
                <h1>This is the Signup page!</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                     this.props.createUser(this.props.name,
                                     this.props.password,
                                     this.props.password2);
                }}>
                    <p><label>
                        Username:
                        <input type="text" onChange={this.props.changeName} />
                    </label></p>

                    <p><label>
                        Password:
                        <input type="password" onChange={this.props.changePassword} />
                    </label></p>

                    <p><label>
                        Confirm Password:
                        <input type="password" onChange={this.props.changePassword2} />
                    </label></p>
                    <input type="submit" value="Submit" />
                </form>

                <Link to='/login'>Back to login</Link>
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Signup);
