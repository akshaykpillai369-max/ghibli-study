import Header from "./components/Header"
import { useState, useEffect } from "react"
import Welcome from './components/Welcome'
import Greeting from "./components/Greeting"

export default function App() {

  const [userName, setUserName] = useState(()=> localStorage.getItem('user-name') || '')

  function saveName(name){

    localStorage.setItem('user-name', name)
    setUserName(name)
  }
  return (
    <main className="min-h-screen relative overflow-hidden">
      
      <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: "url('/bg/forest.png')"
        }}/>


        <div className="absolute inset-0 bg-black/30"/>

        {!userName && <Welcome onSave={saveName}/>}

        <div className="relative z-10 min-h-screen p-6 md:p-8">

          <Header/>
          <Greeting name={userName}/>

        </div>
      
    </main>
  )
}


