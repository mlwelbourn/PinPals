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

    addMessage = async (newMessage) => {
        const id = this.props.match.params.title
        const messageToSend = {
            messages: newMessage,
            pin_id: id
        }
       
        try {
            const createdMessageResponse = await fetch(`http://localhost:8000/api/v1/messages/`, {
                method: 'POST',
                body: JSON.stringify(messageToSend),
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

    getMessages = async () => {
        try {
            const messages = await fetch(`http://localhost:8000/api/v1/messages/${this.props.match.params.title}`, { credentials: 'include' });
            const parsedMessages = await messages.json();

            this.setState({
                messages: parsedMessages.data
            })
        } catch (err) {
            console.log(err);
        }
    }
    
    handleSubmit = (e) => {
        const data = this.state.message
        
        this.addMessage(data);
        // console.log(this.state)
    }

    handleMessageChange = (e) => {
        // this.setState({newMessage: {
        //     ...this.state.newMessage,
        //     [e.currentTarget.name]: e.currentTarget.value
        // }})
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })

    }


    

    componentDidMount() {
        this.addUserToLobby()
        this.getMessages()

    }

    render() {
            console.log(this.props)
            console.log(this.state)
        const postMessages =  this.state.messages.map((message)=> {
                return(
                    <List>
                    <List.Item>
                        {this.props.loggedInUserEmail}: 
                        {message}
                        
                    </List.Item>
                </List>
                )
            })
        return(
            <div>
                <Lobby className='lobby' lobby={this.state.lobby}></Lobby>
                <div>{postMessages}</div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input 
                    type="text"
                    name="message" 
                    placeholder="Type Your Message Here"
                    value={this.state.message}
                    onChange={this.handleMessageChange}>

                    </Form.Input>
                    <Button type="submit">Create Message</Button>
                </Form>
            </div>
        )
    }
}

export default ChatRoom