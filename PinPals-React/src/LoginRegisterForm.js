import React, { Component } from 'react'
import { Header, Form, Button, Grid, Message, Segment } from 'semantic-ui-react'

class LoginRegisterForm extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: '',
            username: '',
            action: 'login'
        }
    }

    login = async (loginInfo) => {
        const response = await fetch(`http://localhost:8000/api/v1/users/login`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(loginInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const parsedLoginResponse = await response.json()

        if (parsedLoginResponse.status.code === 200) {
            this.props.loggedStatus(parsedLoginResponse.data.email)
            this.props.history.push('/map')
        } else {
            console.log('Login Failed: ', parsedLoginResponse);
        }
    }

    register = async (registerInfo) => {
        const response = await fetch(`http://localhost:8000/api/v1/users/register`, {
            method: 'POST',

            credentials: 'include',
            body: JSON.stringify(registerInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const parsedRegisterResponse = await response.json();

        if (parsedRegisterResponse.status.code === 200) {

            this.props.loggedStatus(parsedRegisterResponse.data.email)

            this.props.history.push('/map');
        } else {
            console.log('Register Failed: ', parsedRegisterResponse);
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.loginRegister()
    }

    switchForm = () => {
        if (this.state.action === "login") {
            this.setState({
                action: 'register'
            })
        } else {
            this.setState({
                action: 'login'
            })
        }
    }

    loginRegister = () => {
        if (this.state.action === "login") {
            this.login({
                email: this.state.email,
                password: this.state.password
            })
        } else {
            this.register({
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            })
        }
    }

    
    render() {
        return (
            
            
            <div className="LoginRegisterForm">
                { !this.props.loggedIn ?
                        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                            <Grid.Column style={{ maxWidth: 350 }}>
                                <Form size='large' onSubmit={this.handleSubmit}>
                                    <Segment stacked>
                                        { this.state.action === "register" ?
                                                <React.Fragment>
                                                    <Form.Input
                                                        fluid
                                                        icon='user'
                                                        iconPosition='left'
                                                        type="text"
                                                        name="username"
                                                        placeholder="Username"
                                                        value={this.state.username}
                                                        onChange={this.handleChange}
                                                    />
                                                </React.Fragment>
                                                :
                                                null
                                        }

                                        <Form.Input
                                            fluid
                                            icon='mail'
                                            iconPosition='left'
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Input
                                            fluid
                                            icon='lock'
                                            iconPosition='left'
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                        />
                                        <Button fluid size='large' type="submit">
                                            {this.state.action === "register" ? "Register" : "Log in"}
                                        </Button>
                                    </Segment>
                                </Form>
                                <Message>
                                    { this.state.action === "register" ?
                                            <small>Already have an account? Log in <span onClick={this.switchForm}>here</span>.</small>
                                            :
                                            <small>Need an account? Sign up <span onClick={this.switchForm}>here</span>!</small>
                                    }
                                </Message>
                            </Grid.Column>
                        </Grid>
                        :
                        <div></div>}
            </div>
        )
    }
}

export default LoginRegisterForm