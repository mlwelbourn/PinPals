import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Container, Menu } from 'semantic-ui-react';

class HeaderComponent extends Component {
    logoutHandler = () => {
        this.props.logout()
    }

    render() {
        return (
            <Header style={{margin: 0}} className='header'>
                <Menu 
                // fixed='top'
                >
                    <Container>
                        <Menu.Item><Link to='/'>Home</Link></Menu.Item>
                        <Menu.Item><Link to='/map'>Map</Link></Menu.Item>
                        <Menu.Item><Link to='/notifications'>Notifications</Link></Menu.Item>
                        {
                            this.props.loggedIn
                                ?
                                <Menu.Item>
                                    <Link to='/' onClick={this.logoutHandler}>Logout</Link>
                                </Menu.Item>
                                :
                                null
                        }
                        {
                            this.props.loggedIn
                                ?
                                <Menu.Item position='right'>
                                    {this.props.loggedInUserEmail}
                                </Menu.Item>
                                :
                                null
                        }
                    </Container>
                </Menu>
            </Header>
        )
    }
};

export default HeaderComponent;