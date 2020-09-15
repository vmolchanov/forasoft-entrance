import './App.scss';
import React from 'react';
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Name from './scenes/Name';
import Chat from './scenes/Chat';
import CreateChat from './scenes/CreateChat';
import ChooseChat from './scenes/ChooseChat';

const App = () => {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path='/' component={Name} />
                    <Route exact path='/chat/:id' component={Chat} />
                    <Route exact path='/create' component={CreateChat} />
                    <Route exact path='/choose' component={ChooseChat} />
                </Switch>
            </Router>
        </div>
    );
};

export default App;
