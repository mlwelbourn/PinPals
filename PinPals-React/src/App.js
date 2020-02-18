import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginRegisterForm from './LoginRegisterForm';
import Header from './Header';
import MapContainer from './MapContainer';
import ChatRoom from './ChatRoom';	

import './styles.css'

class App extends Component {
	state = {
		loggedIn: false,
		loggedInUserEmail: null
	}

	handleLoggedInStatus = (loggedInUserEmail) => {
		this.setState({
			loggedIn: true,
			loggedInUserEmail: loggedInUserEmail
		})
	}

	logout = async () => {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/logout`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const parsedLogoutResponse = await response.json();

		if (parsedLogoutResponse.status.code === 200) {
			this.setState({
				loggedIn: false,
				loggedInUserEmail: ''
			})
		} else {
			console.log('Register Failed: ', parsedLogoutResponse);
		}
	}

	render() {
		return (
			<main>
				<Header loggedIn={this.state.loggedIn} loggedInUserEmail={this.state.loggedInUserEmail} logout={this.logout} />
				<Switch>
					<Route
						exact path="/"
						render={(props) => <LoginRegisterForm {...props}
							loggedIn={this.state.loggedIn}
							loggedStatus={this.handleLoggedInStatus}
						/>}
					/>
					<Route
						exact path="/map"
						render={(props) => <MapContainer {...props}/>}
					/>
					<Route
						exact path="/chat"
						render={(props) => <ChatRoom {...props} loggedInUserEmail={this.state.loggedInUserEmail}/>}
					/>
				</Switch>


			</main>
		)
	}
}

export default App;
