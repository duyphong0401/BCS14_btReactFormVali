import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const HeaderRoute = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/add-ttsv" className={(props) => props.isActive ? "nav-link text-danger" : "nav-link text-secondary"} >Thêm SV</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/edit-ttsv" className={(props) => props.isActive ? "nav-link text-danger" : "nav-link text-secondary"} >Sửa SV</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                <Outlet />
            </div>
        </div>
    )
}

export default HeaderRoute
