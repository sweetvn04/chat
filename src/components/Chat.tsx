import {useState, useEffect, useRef} from "react"
import ReactMarkdown from "react-markdown"

export default function Chat(){
  // state for input 
  const [input, setInput] = useState("")
  //state for storing messages
  const [messages, setMessages] = useState([])

  // show the input log via f12 
  // console.log(input)

  const bottomRef = useRef(null) // create a ref to attact to a real DOM element. This is <div> below
  
  useEffect(
    // bottomRef.current is exactly the <div> has attribute ref={bottomRef}
    // ? is check if bottomRef null. and scrollIntoView is a browser method to scroll to this div has reference
    () => {bottomRef.current?.scrollIntoView({behavior: "smooth"})},
    [messages] // useEffect run when messages change
  )

  async function sendMessages(){
    setMessages([...messages, {role: "user", content: input}]) // unpack the messages array and add the collection after it
    setInput("") // set the variable equal empty to clear the input field after send message
    
    // setMessages([...messages,{role: "bot", content: "I recieved your message!"}])

    // cant use the above one cuz React btaches all update and applies it after function finishes.
    // so if use setMessage(...messages), all two of these line will use the same old array
    // and the second one will overwrite the first one setMessage line
    
    // now the messages state have the input of user but react do not update it immediately
    
    //so we use another array and call it which have user input, then we add the response of bot
    //setMessages(prev => [...prev, {role: "bot", content: "I recieved your message!"}])
    
    // fetch to the server and send the user message
    const response = await fetch("http://localhost:8000/chat", {
      method: "POST", // it is a sending data request
      headers: {"Content-Type": "application/json"}, // tell fastapi that is an json format
      body: JSON.stringify({message: input}) // it make this js object like '{message: input}'. It's a plain text so it's easy to travel on the internet 
    })

    const data = await response.json() // waiting response from backend

    setMessages(prev => [...prev, {role: "bot", content: data.reply}])
  }

    

    //one more thing that react can use two type of parameter. value and function return value  


  return (
    <>
      <div className="flex flex-col  h-screen p-4 items-center">
        <div className="flex-1 flex flex-col  overflow-y-auto gap-2 mb-4">
          {
            messages.map(
              function(msg, index){
                return (
                  <div 
                    key={index}
                    className={`max-w-lg rounded-lg p-3 ${msg.role==='user' ? "bg-blue-200 ml-auto" : "bg-gray-200 mr-auto"}`}
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                )
              }
            )
          }
          <div ref={bottomRef} />
        </div>

        <div className="flex gap-2">
          <input className="flex-1 border rounded p-2"
            value={input} // set value equal input (so we can clear the <input> by empty the input of state)
            placeholder="Type something here!"
            onChange={(e) => setInput(e.target.value)} // write the input to the variable of state (input variable)
            onKeyDown={e => {
              if (e.key === "Enter"){
                sendMessages()
              }
            }}
          />
          <button onClick={sendMessages}>Send</button>
        </div>

      </div>
      
      
    </>
  )
}
