import React from 'react'
import Lobby from './Lobby'
import { Button, List, Comment, Form, Header } from 'semantic-ui-react'

class ChatRoom extends React.Component {
    constructor() {
        super();
        this.state = {
            lobby: [],
            messages: [],
        }
    }
    addUserToLobby = () => {
        if(this.props.loggedInUserEmail) {
            this.setState({
                lobby: [this.props.loggedInUserEmail]
            })
        }
    }

    addMessage = async (e, message) => {
        

        try {
            const createdMessageResponse = await fetch(`http://localhost:8000/api/v1/cities/`, {
                method: 'POST',
                body: JSON.stringify(message),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const parsedResponse = await createdMessageResponse.json();

            this.setState({
                messages: [...this.state.messages, parsedResponse.data]
            })


        } catch (err) {
            console.log('error: ', err)
        }
    }

    handleSubmit = (e) => {
        this.addMessage();
    }

    handleMessageChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    componentDidMount() {
        this.addUserToLobby()
    }

    render() {
        console.log(this.state)
        return(
            <div>
                <Lobby className='lobby' lobby={this.state.lobby}></Lobby>
                <List>
                    <List.Item>
                        {this.props.loggedInUserEmail}:  {this.state.messages}
                    </List.Item>
                </List>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input 
                    type="text"
                    name="messages" 
                    placeholder="Type Your Message Here"
                    value={this.state.messages}
                    onChange={this.handleMessageChange}>

                    </Form.Input>
                    <Button type="submit">Create Message</Button>
                </Form>
            </div>
        )
    }
}

export default ChatRoom