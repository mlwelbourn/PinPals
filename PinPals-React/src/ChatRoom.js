import React from 'react'
import Lobby from './Lobby'
import { Button, List, Comment, Form, Header, Grid } from 'semantic-ui-react'
import './styles.css'


class ChatRoom extends React.Component {
    constructor() {
        super();
        this.state = {
            lobby: [],
            messages: [],
        }
    }
    addUserToLobby = () => {
        if(this.props.loggedInUserName) {
            this.setState({
                lobby: [this.props.loggedInUserName]
            })
        }
    }

    addMessage = async (newMessage) => {
        const pinId = this.props.match.params.title
        const userNameId = this.props.loggedInUserName
        const messageToSend = {
            messages: newMessage,
            pin_id: pinId,
            user_id: userNameId
        }
        console.log(messageToSend)
       
        try {
            const createdMessageResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/messages/`, {
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
            const messages = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/messages/${this.props.match.params.title}`, { credentials: 'include' });
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
            console.log(this.state.messages)
        const postMessages =  this.state.messages.map((message)=> {
                return(
                    <Comment>
                        <Comment.Author as='a'>{message.user_id}</Comment.Author>
                         <Comment.Text>                        {message.messages}
                    </Comment.Text>
                    </Comment>
                )
            })
        return(
            <Grid divided  style={{ height: '90vh' }}>
                <Grid.Column  width={8} id='leftChatColumn'>
                    {postMessages}
                        <Form style={{marginTop: 'auto'}} onSubmit={this.handleSubmit}>
                        <Form.Input 
                        type="text"
                        name="message" 
                        placeholder="Type Your Message Here"
                        value={this.state.message}
                        onChange={this.handleMessageChange}>
                        </Form.Input>
                        <Button type="submit">Create Message</Button>
                    </Form>
                </Grid.Column>
             
                <Grid.Column width={2}>
                    <Lobby className='lobby' lobby={this.state.lobby}></Lobby>
                </Grid.Column>
                    
            </Grid>
        )
    }
}

export default ChatRoom