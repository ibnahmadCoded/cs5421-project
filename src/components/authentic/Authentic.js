import React, { useEffect, useState } from "react";
import { Button, Input, Form, Select, Card, Modal, Space } from "antd";
import {UserOutlined, LockOutlined} from "@ant-design/icons"
import { useLocation, useNavigate } from "react-router-dom";
import * as api from "../../api/index.js";
import "../../login.css";

const { Option } = Select;
const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 10,
      },
    },
};

function createErrorModal(errorMessage) {
    Modal.error({
      title: 'ERROR!',
      content: errorMessage,
    });
}


const Authentic = ({isAuth, changeIsAuth, changeUserInfo, changePath}) => {
    const [form] = Form.useForm()
    const [isLogin, setIsLogin] = useState(true)
    const [userType, setUserType] = useState("user")
    const navigate = useNavigate()

    useEffect(() => {
        changePath(window.location.pathname)
      }, [])

    useEffect(() => {
        if(isAuth === true) {
            changePath("/")
            navigate("/")
        } else {
            changePath("/login")
            navigate("/login")
        }
    }, [isAuth, window.location.pathname])

    const onModeSwitch = () => {
        form.resetFields();
        setIsLogin((previousIsLogin) => !previousIsLogin)
        console.log(isLogin)
    }

    /*
        TODO: backend return token and other info, store the info in the localstorage
        For example 
        onFinish = async(values) => {
            if (userType === "user") {
                if(isLogin) {
                    const res = await api.xxxxxx(login api)
                    if (res.status === statusnumber means success) {
                        localStorage.setItem('profile', res.data); 
                        (   
                            data include username and token 
                            please don't just redirect it will destory the css as the css and ui I used is
                            different with aliyu. I need to control the css change by login component, 
                            so please just return the status value and the data then use the frontend to implement
                            jumping to the home page.
                        )
                        changeUserInfo(JSON.parse(localStorage.getItem('profile')))
                    
                        changePath("/")
                        navigate("/")
                    } else {
                        output error information by using message or modal
                    }
                } else {
                    const res = await api.xxxxxx(register api)
                    if (res.status === statusnumber means success) {
                        output the successfully information and return to login
                        setIsLogin(true)
                        form.resetFields();
                    } else {
                        output the error information by using message or modal
                    }
                }
            } else if (userType === "admin") {
                if(isLogin) {
                    changePath("/")
                    navigate("/")
                } else {
                    setIsLogin(true)
                    form.resetFields();
                }
            }
        }
    */
    const onFinish = async(values) => {
        console.log('Received values of form: ', values);
        if (userType === "user") {
            if(isLogin) {
                const loginFormData = {
                    email: values?.email,
                    password: values?.password,
                }
                const res = await api.userLogin(loginFormData)
                console.log(res)
                
                if(res?.data?.success === true) {
                    let userInformation = {
                        username: res?.data?.payload?.name,
                        useremail: values.email,
                        usertype: res?.data?.userType
                    }
                    localStorage.setItem('profile', JSON.stringify(userInformation));
                    changeUserInfo(JSON.parse(localStorage.getItem('profile')))
                    
                    changePath("/")
                    navigate("/")
                } else if ( res?.status === 400 ) {
                    
                } else if (res?.status === 404) {

                }

            } else {
                const registerFormData = {
                    name: values?.username,
                    email: values?.email,
                    password: values?.password,
                    studentId: values?.studentid,
                }
                console.log(registerFormData)
                const res = await api.userRegister(registerFormData)
                console.log(res)
                if (res?.status === 400) {
                    /**/
                    createErrorModal("Email already exists")
                    form.resetFields()
                } else {
                    setIsLogin(true)
                    form.resetFields()
                }
            }
        } else if (userType === "admin") {
            if(isLogin) {
                const loginFormData = {
                    email: values?.email,
                    password: values?.password,
                }
                const res = await api.adminLogin(loginFormData)
                console.log(res)
                if(res?.data?.success === true) {
                    let userInformation = {
                        username: res?.data?.payload?.name,
                        usertype: res?.data?.userType
                    }
                    localStorage.setItem('profile', JSON.stringify(userInformation));
                    changeUserInfo(JSON.parse(localStorage.getItem('profile')))

                    changePath("/")
                    navigate("/")
                } else if (res?.status === 404) {

                } else if (res?.status === 400) {

                }
                
            } else {
                const registerFormData = {
                    name: values.username,
                    email: values.email,
                    password: values.password,
                    department: values.department,
                    designation: values.designation,
                }
                console.log(registerFormData)
                const res = await api.adminRegister(registerFormData)
                console.log(res)

                if(res?.status === 400) {
                    createErrorModal("Email already exists")
                    form.resetFields()
                } else {
                    setIsLogin(true)
                    form.resetFields();
                }      
            }
        }
    };

    const onUserTypeChange = (value) => {
        setUserType(value)
    }

    return (
        <div className="login_content">
            <div className="left_pane"></div>
        <div className="right_pane">
        <div id="login_form">
            <div className="login_logo"> <div className="logo_icon"></div> </div>
	        <div className="form_header">
		        <div className="login_container">
                    {
                        isLogin ? (<h4>Login</h4>) : (<h4>Register</h4>)
                    }      
		        </div>
		        <div className="register_container"> 
			        <span> 
                        {
                            isLogin ? (<a onClick={onModeSwitch}>Register</a>) : (<a onClick={onModeSwitch}>Login</a>)
                        }
                    </span> 
		        </div>
	        </div>
            <div className="form_content">
                <Card style={{ width: 470 }}>
                {
                    isLogin ?
                   (
                        <Form form={form} name="normal_login" className="login-form" initialValues={{ UserType: userType, username: "", password: "" }} onFinish={onFinish}>
                            <Form.Item 
                                name="UserType" 
                                label="" 
                                rules=
                                    {[
                                        {
                                            required: true,
                                            message: 'Please select the user type!',
                                        },
                                    ]}
                            >
                                <Select 
                                    placeholder="Please select your user type"
                                    onChange={onUserTypeChange}
                                >
                                    <Option value="user">user</Option>
                                    <Option value="admin">admin</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item 
                                name="email"
                                tooltip="please input your nus E-mail like xxxxx@u.nus.edu"
                                rules={[
                                    {
                                        pattern: new RegExp(".+@u.nus.edu"),
                                        message: 'The input is not valid NUS e-mail address!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="please input your nus e-mail like xxxx@u.nus.edu" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                            </Form.Item>
                    </Form>
                    ) : (
                        <Form
                            form={form}
                            name="register"
                            onFinish={onFinish}
                            initialValues={{
                                UserType: userType, 
                                username: "", 
                                password: ""
                            }}
                            {...formItemLayout}
                            scrollToFirstError
                        >
                            <Form.Item 
                                name="UserType" 
                                label="UserType" rules=
                                {[
                                    {
                                        required: true,
                                        message: 'Please select the user type!',
                                    },
                                ]}
                            >
                                <Select 
                                    placeholder="Select a option and change input text above"
                                    onChange={onUserTypeChange}
                                >
                                    <Option value="user">user</Option>
                                    <Option value="admin">admin</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="username"
                                label="username"
                                rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
                            >
                                <Input placeholder="please input your username"/>
                            </Form.Item>
                            {
                                (userType === "user") && (
                                    <Form.Item
                                        name="studentid"
                                        label="student ID"
                                        rules={[
                                            {
                                                pattern: new RegExp("A[0-9]{7,7}[A-Z]"),
                                                message: 'The input is not valid NUS student ID!',
                                            },
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="please input your nus e-mail"/>
                                    </Form.Item>
                                )   
                            }
                            <Form.Item
                                name="email"
                                label="E-mail"
                                tooltip="please input your nus E-mail like xxxxx@u.nus.edu"
                                rules={[
                                    {
                                        pattern: new RegExp(".+@u.nus.edu"),
                                        message: 'The input is not valid NUS e-mail address!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                            >
                                <Input placeholder="please input your nus e-mail"/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                name="confirm"
                                label="Confirm Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            {
                                (userType === "admin") && (
                                    <Form.Item
                                        name="department"
                                        label="department"
                                        rules={[{ required: true, message: 'Please input admin department!', whitespace: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                )
                            }
                            {
                                (userType === "admin") && (
                                    <Form.Item
                                        name="designation"
                                        label="designation"
                                        rules={[{ required: true, message: 'Please input admin designation!', whitespace: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                )
                            }
   
   
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                    )
                }
                </Card>
            </div>
        </div> 
        </div>
        </div>
    )
}

export default Authentic