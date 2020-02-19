import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Button, Header, Modal } from 'semantic-ui-react';

class CreatePin extends Component {
    constructor() {
        super();
        

        this.state = {
            title: '',
            description: '',
            submit: false,
        }
    }


    handleTitleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
           
        })
    }

    handleDescriptionChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    changeSubmit = (e) => {
        this.props.addPin(e, this.state)
        this.setState({
            submit: true
        })
    }

    handleShow = () => {
        console.log(this.props.id)
        this.props.props.history.push(`/chat/${this.props.id}`)
    }

    clearForm = () => {
        this.setState({
            title: ''
        })
    }

    render() {
        console.log(this.state)
        console.log(this.props)
        return(
            <>
          
            {!this.props.submit ?
                <>
                <Header>Event Description</Header>
                <Modal.Content>
                    <Form  size='small' onSubmit={this.changeSubmit}>
                        <Form.Field>
                            <label>What do you want to do?</label>
                            <Form.Input type="text" name="title" value={this.state.title} onChange={this.handleTitleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>When do you want to do it?</label>
                            <Form.Input type="text" name="description" value={this.state.description} onChange={this.handleDescriptionChange}/>
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Modal.Content>
                </> 
                : <>
                   <Card size='small'>
                    <Card.Content>
                        Event: {this.props.title}
                    </Card.Content>
                    <Card.Content>
                        <Card.Description>
                            Time: {this.props.description}
                    </Card.Description>
                    </Card.Content>
                    <Button onClick={() => 
                        this.props.deletePin(this.props.id)
                        
                        }
                        >Delete Pin</Button>
                    <Button
                        onClick={this.handleShow}>
                        {/* <Link to={`/chat/${this.props.id}`}>Connect</Link> */}
                        Connect
                        </Button>
                        </Card> 
                    </>
                    
                }    
            </>
              
        )
    }
}

export default CreatePin;