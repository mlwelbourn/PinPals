import React from 'react'
import Lobby from './Lobby'
import { Button, List, Comment, Form, Header } from 'semantic-ui-react'

class ChatRoom extends React.Component {
    constructor() {
        super();
        this.state = {
            lobby: [],
            newMessage: {},
        }
    }
    addUserToLobby = () => {
        if(this.props.loggedInUserEmail) {
            this.setState({
                lobby: [this.props.loggedInUserEmail]
            })
        }
    }

    addMessage = async (idx, e, data) => {
        console.log(data)
        e.preventDefault();
        try {
            const createdMessageResponse = await fetch(`http://localhost:8000/api/v1/messages/`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const parsedResponse = await createdMessageResponse.json();

            this.setState({
                messages: [...this.state.messages, parsedResponse.data]
            })
            console.log(this.state)

        } catch (err) {
            console.log('error: ', err)
        }
    }

    // handleSubmit = (e) => {
    //     this.addMessage();
    //     // console.log(this.state)
    // }

    handleMessageChange = (e) => {
        this.setState({newMessage: {
            ...this.state.newMessage,
            [e.currentTarget.name]: e.currentTarget.value
        }})
    }

    componentDidMount() {
        this.addUserToLobby()
    }

    render() {
            console.log(this.props)
            console.log(this.state)
        return(
            <div>
                <Lobby className='lobby' lobby={this.state.lobby}></Lobby>
                
                <List>
                    <List.Item>
                        {this.props.loggedInUserEmail}:  {this.state.messages}
                    </List.Item>
                </List>
                <Form onSubmit={this.addMessage.bind(null)}>
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