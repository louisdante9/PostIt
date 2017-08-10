import React, { Component } from 'react';

import Hoc from './';

class Dashboard extends Component {

    render() {
        return (
            <h1> Hello dashboard </h1>
        );
    }
}



export default Hoc(Dashboard);