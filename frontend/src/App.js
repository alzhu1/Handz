import React from 'react';
//import logo from './logo.svg';
import './App.css';

import Header from './Header';
import Main from './Main';

class App extends React.Component {
    componentDidMount() {
        // axios.get("/api/text/")
        //     .then(function(response) {
        //         console.log(response.data);
        //     });
    }

    render() {
        return (
            <div>
                <Header />
                <Main lobbySock={this.props.lobbySock} signupSock={this.props.signupSock} />
            </div>
        );
    }
}

export default App;
