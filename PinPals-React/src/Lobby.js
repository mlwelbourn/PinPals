import React from 'react'
import { Message, Grid, Card, Button, Comment, Form, Header } from 'semantic-ui-react'
import './styles.css'

function Lobby (props) {
    const { lobby } = props
    const lobbyStyle = {
        
        cardStyle : {
            display: "flex",
            marginTop: "4em",
            justifyContent: "flex-end",
            alignContent: "right",
        },
        
    }

const lobbyList = lobby && lobby.map((lobby) => {
    console.log(lobby)
    return (
        <Card className='lobby-card' style={lobbyStyle.cardStyle}>
            <Card.Header textAlign='center'>Lobby</Card.Header>
            <Message>{lobby}</Message>
        </Card>
    )
})

return(
    <div>{lobbyList}</div>
)
}

    export default Lobby
