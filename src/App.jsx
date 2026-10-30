import Header from "./components/Header"
import { useState, useEffect } from "react"
import Welcome from './components/Welcome'
import Greeting from "./components/Greeting"
import PomoStartWidget from "./components/PomoStartWidget"
import FocusScreen from "./components/FocusScreen"
import SessionHistory from "./components/SessionHistory"
import DailyGoal from "./components/DailyGoal"
import RecentSessions from "./components/RecentSessions"

export default function App() {

  const [userName, setUserName] = useState(()=> localStorage.getItem('user-name') || '')
  const [isFocusOpen, setIsFocusOpen] = useState(false)

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
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr_1fr]">
            <Greeting name={userName}/>
            <DailyGoal/> 
            <PomoStartWidget onstart={() => setIsFocusOpen(true)} />
             
          </div>
          
          <SessionHistory/>
          <RecentSessions/>
          

        </div>
     {isFocusOpen && (

      <FocusScreen onClose={() => setIsFocusOpen(false)}/>
      )} 
    </main>
  )
}


