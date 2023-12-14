import React, {useEffect, useState} from 'react';
import './App.css';
import { consumer, API_BASE_URL } from './constants/api';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState<String[]>([])
  const [text, setText] = useState<string>('')

  useEffect(() => {
    onMount()
    console.log('mounted')
    return () => {
      consumer.disconnect()
    }
  }, [])

  function onMount() {
    consumer.subscriptions.create({channel: "RoomsChannel"}, {
      connected() {
        console.log('connected')
      },
      received(data) {
        setMessages(prev => {
          return [...prev, data.body]
        })
      }
    })
  }

  function handleClick(){
    const messageParams = {
      message: {
        body: text,
        chatroom_id: 1
      }
    }
    axios.post(`${API_BASE_URL}/messages`, messageParams)
      .then(() => null)
      .catch(error => {
        console.log(error)
      }).finally(() => {
        setText('')
      })
  }

  return (
    <div>
      {messages.map((message, index) => {
        return <p key={index}>{message}</p>
      })}
      <input type="text" onChange={(e) => setText(e.target.value)} value={text}/>
      <button onClick={handleClick}>Send Message</button>
    </div>
  );
}

export default App;
