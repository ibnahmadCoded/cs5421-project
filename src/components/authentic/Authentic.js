import React, { useEffect, useState } from "react";
import { Button, Input, Form, Select, Card } from "antd";
import {UserOutlined, LockOutlined} from "@ant-design/icons"
import { useLocation, useNavigate } from "react-router-dom";
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
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        if (userType === "user") {
            if(isLogin) {
                if(values.username === "gejing") {
                    localStorage.setItem('profile', JSON.stringify(values));
                    changeUserInfo(JSON.parse(localStorage.getItem('profile')))
                    
                    changePath("/")
                    navigate("/")
                }
            } else {
                setIsLogin(true)
                form.resetFields();
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
                                    placeholder="Select a option and change input text above"
                                    onChange={onUserTypeChange}
                                >
                                    <Option value="user">user</Option>
                                    <Option value="admin">admin</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item 
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
                                        <Input />
                                    </Form.Item>
                                )   
                            }
                            <Form.Item
                                name="email"
                                label="E-mail"
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
                                <Input />
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