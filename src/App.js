import { useCallback, useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  //useRef hook
  const passRef = useRef(null);

  // useCallback dependencies tells us if there is any change in these remember them
  const passGenerator = useCallback(()=> {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdeghijklmnopqrstuvwxyz";

    if(number)  str += "0123456789";
    if(charAllowed) str += '!@#$%^*-_+={}[]~`';

    for(let i = 1; i<=length; i++){
      let char  = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char);
    }

    setPassword(pass);
    setIsClicked(false);

  }, [length, number, charAllowed, setPassword]);

  const copyPassToClipboard = useCallback(()=>{
    setIsClicked(!isClicked);
    passRef.current ?.select();
    passRef.current ?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
    
  }, [password]);


  useEffect(()=>{
    passGenerator();
  }, [length, number, charAllowed, passGenerator]);
  return (

    <div className='App'>

      <h1 className="text-4xl text-center text-white py-6">
        Password Generator
      </h1>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700'>
        <div className='flex flex-shadow overflow-hidden mb-4 gap-4'>
          <input type='text' value={password} className='outline-none w-full py-1 px-3 rounded-lg'
          placeholder='password' readOnly ref={passRef} />
          <button className={`outline-none text-white px-3 py-1 rounded-lg  ${isClicked ? 'bg-red-700': 'bg-blue-700'}`} onClick={copyPassToClipboard}>Copy</button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className='flex items-center gap-x-1'>
            <input type='range' min={6} max={50} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}/>
            <label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type='checkbox' value={number} className='cursor-pointer' onChange={(e) => {setNumber((prev) => !prev)}}/>
            <label>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type='checkbox' value={charAllowed} className='cursor-pointer' onChange={(e) => {setCharAllowed((prev) => !prev)}}/>
            <label>Characters</label>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
