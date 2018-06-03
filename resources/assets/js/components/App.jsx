import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    render() {
        return (
            <div>
                <h3>APP COMPONENT</h3>
            </div>
        );
    }
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}