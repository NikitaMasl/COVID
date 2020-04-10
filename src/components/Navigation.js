import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Navigation extends Component {
    render() {
        return (
            <nav className="navigation-bar">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" exact to="/">Russia</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/MSC">Moscow</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/SPB">Saint-Petersburg</NavLink>
                    </li>
                </ul>
            </nav>
        )
    }
}
