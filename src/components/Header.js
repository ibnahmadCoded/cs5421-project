import { useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "antd";
import PropTypes from 'prop-types'
import logo from '../assets/logo.png'
import Button from './Button'
import { useEffect, useState } from "react";


const Header = ({title, changePath, userInfo, changeUserInfo, isAuth}) => {
    const navigate = useNavigate();
    const onClick = () => {
        changePath("/login")
        changeUserInfo(null)
        localStorage.clear()
        navigate("/login")
    }

    useEffect(() => {
        if(isAuth === false) {
            changePath("/login")
            navigate("/login")
        } else {
            changePath("/")
        }     
    }, [isAuth])

    return (
        <header style={centerStyle}>
            <img src={logo} alt="logo" height="60" style={imageStyle}/>
            <h1 style={headingStyle}>{title}</h1>
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{userInfo?.username[0]}</Avatar>
            <h6>{userInfo?.username}</h6>
            <Button color="#ED6630" text="logout" onClick={onClick}/>
        </header>
    )
}

Header.defaultProps = {
    title: "Query Evaluator",
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

const headingStyle = {
    color: "#104880",
    top: "10px",
    left: "10px",
    fontSize: "60px",
    paddingRight: "60px",
}

const imageStyle = {
    float: "left",
    paddingRight: "40px",
  }

const centerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: "40px",
  }

export default Header