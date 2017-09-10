import React from 'react';

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
                <Main lobbySock={this.props.lobbySock}
                      signupSock={this.props.signupSock}
                      chatSock={this.props.chatSock}/>
            </div>
        );
    }
}

export default App;
