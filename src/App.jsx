import { useState, useCallback, useEffect , useRef} from 'react'

function App() {
  const [Length, setLength] = useState(8)
  const[numberAllowed, setNumberAllowed]= useState(false)
  const [charAllowed, setCharAllowed]= useState(false)
  const [password, setPasword]= useState("")

  const passwordRef = useRef(null)

  const passGenerator = useCallback(()=>{
    let pass =""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str+= "0123456789"
    if(charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for(let i=1; i<=Length; i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPasword(pass)
  }, [Length, numberAllowed, charAllowed, setPasword])
  
  const copypasswordToClip = useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current.setSelectionRange(0, 3)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passGenerator()
  },[Length, charAllowed, numberAllowed, passGenerator])
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-3 text-yellow-500 bg-gray-800'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text" value={password}  className='outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passwordRef}/>
      <button onClick={copypasswordToClip} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={100} value={Length} className='cursor-pointer' 
          onChange={(e) => {setLength(e.target.value)}}/>
          <label>length :{Length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" checked={numberAllowed} id="numberInput" onChange={(e) => {setNumberAllowed((prev)=> !prev)}}/>
          <label>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" checked={charAllowed} id="numberInput" onChange={(e) => {setCharAllowed((prev)=> !prev)}}/>
          <label>Special Chars</label>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
