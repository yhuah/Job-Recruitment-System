import React from 'react';
import './App.css';
import UserPanel from "./UserPanel/UserPanel";
import Student from '../pages/Student'


class App extends React.Component {
    render() {


    return(
        <div>
       <UserPanel/>
        <Student/>

    </div>);
}
}

export default App;
