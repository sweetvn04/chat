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
    
    // setMessages([...messages,{role: "bot", content: "I recieved your message!"}])

    // cant use the above one cuz React btaches all update and applies it after function finishes.
    // so if use setMessage(...messages), all two of these line will use the same old array
    // and the second one will overwrite the first one setMessage line
    
    // now the messages state have the input of user but react do not update it immediately
    
    //so we use another array and call it which have user input, then we add the response of bot
    setMessages(prev => [...prev, {role: "bot", content: "I recieved your message!"}])
    }
    //one more thing that react can use two type of parameter. value and function return value  


  return (
    <>
      <div className="flex flex-col  h-screen p-4">
        <div className="flex-1 overflow-y-auto gap-2 mb-4">
          {
            messages.map(
              function(msg, index){
                return (
                  <p 
                    key={index}
                    className={`max-w-xs rounded-lg p-3 ${msg.role==='user' ? "bg-blue-200 ml-auto" : "bg-gray-200 mr-auto"}`}
                  >
                    {msg.content}
                  </p>
                )
              }
            )
          }
        </div>

        <div className="flex gap-2">
          <input className="flex-1 border rounded p-2"
            value={input} // set value equal input (so we can clear the <input> by empty the input of state)
            placeholder="Type something here!"
            onChange={(e) => setInput(e.target.value)} // write the input to the variable of state (input variable)
          />
          <button onClick={sendMessages}>Send</button>
        </div>

      </div>
      
      
    </>
  )
}
