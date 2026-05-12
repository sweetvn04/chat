import {useState} from "react"

export default function Chat(){
  // state for input 
  const [input, setInput] = useState("")
  //state for storing messages
  const [messages, setMessages] = useState([])

  // show the input log via f12 
  console.log(input)

  function sendMessages(){
    setMessages([...messages, {role: "user", content: input}]) // unpack the messages array and add the collection after it
    setInput("") // set the variable equal empty to clear the input field after send message
  }

  return (
    <>
      <input
        value={input} // set value equal input (so we can clear the <input> by empty the input of state)
        placeholder="Type something here!"
        onChange={(e) => setInput(e.target.value)} // write the input to the variable of state (input variable)
      />

      <button onClick={sendMessages}> Send </button>
      <button onClick={ () => setInput("") }> Clear </button>

      <div>
        {messages.map((msg, index) => <p key={index}> {msg.role}: {msg.content} </p>)}
      </div>
    </>
  )
}
