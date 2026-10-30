import { Play, Pause, X, Music } from "lucide-react";
import { useState, useEffect } from "react";
import MusicPlayer from "./MusicPlayer";


export default function FocusScreen({onClose}){

    const[time, setTime] = useState(5)
    const [isRunning, setIsRunning] = useState(true)
    const [showStopConfirm, setShowStopConfirm] = useState(false)
    const [sessionSaved, setSessionSaved] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [breakTime, setBreakTime] = useState(5)
    const [isBreakRunning, setIsBreakRunning] = useState(false)
    const [isBreakCompleted, setIsBreakCompleted] = useState(false)

    function handleStop(){

        if(time>0){

            setShowStopConfirm(true)
        }
        else{
            onClose()
        }
    }

    useEffect(() => {

        if(!isRunning || time <=0) return

        const interval = setInterval(() => {

            setTime((previousTime) => previousTime -1)
        },1000)

        return () => clearInterval(interval)
    }, [isRunning, time])

    useEffect(() => {

        if(time !== 0) return
        setIsCompleted(true)
        setIsBreakRunning(true)
    },[time])

    useEffect(() => {

        if(!isBreakRunning || breakTime <=0) return

        const interval = setInterval(()=> {
            setBreakTime((previousTime) => previousTime-1)
        },1000)

        return () => clearInterval(interval)
    },[isBreakRunning, breakTime])

    useEffect(()=> {

        if(breakTime !==0) return

        setIsBreakCompleted(true)
        setIsBreakRunning(false)
    }, [breakTime])

    useEffect(()=> {

        if(time !== 0 || sessionSaved) return

        const completedSession = {

            date : new Date().toISOString(),
            duration: 25
        }

        const history = JSON.parse(localStorage.getItem('ghibli-session-history') || '[]')

        history.push(completedSession)

        localStorage.setItem('ghibli-session-history', JSON.stringify(history))

        setSessionSaved(true)
    }, [time, sessionSaved])

    const minutes = Math.floor(time/ 60)
    const remainingTime = time % 60
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingTime).padStart(2,'0')}`

    const breakMinutes = Math.floor(breakTime/60)
    const breakSeconds = breakTime % 60
    const formattedBreakTime = `${String(breakMinutes).padStart(2, '0')}: ${String(breakSeconds).padStart(2,'0')}`

    if(isBreakCompleted){

        return (

            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-green-950 text-center text-white">
                <div className="mb-6 text-6xl">🌿</div>

                <h2 className="text-4xl font-bold text-lime-200">
                    Break completed!
                </h2>

                <p className="mt-4 max-w-md text-lg text-green-100">

                    Yor mind has had some time to rest.Ready for another focus session ?
                </p>

                <button onClick={()=> {
                    setTime(25 * 60) 
                    setIsRunning(true) 
                    setIsCompleted(false)
                    setBreakTime(5 * 60)
                    setIsBreakCompleted(false)
                    setIsBreakRunning(fasle)
                    setSessionSaved(false)
                    }} className="mt-8 rounded-xl bg-lime-200 px-8 py-3 font-semibold text-green-950 transition hover:bg-lime-100 ">

                        Start another session

                </button>

                <button onClick={onClose} className="mt-3 text-sm text-green-200 hover:text-white">
                    Leave focus mode
                </button>
            </div>
        )
    }

    if(isCompleted){

        return(

            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-green-950 px-5 text-center text-white">
                <div className="mb-6 text-6xl">
                    🌿
                </div>

                <h2 className="text-4xl font-bold text-lime-200">
                    Congratulations
                </h2>

                <p className="mt-4 max-w-md text-lg text-green-100">
                    You did it! You completed your focus session. We're proud of you! Now take a little break. You've earned it.
                </p>

                <p className="mt-6 text-5xl font-bold tabular-nums">
                    {formattedBreakTime}
                </p>

                <p className="mt-2 text-sm uppercase tracking-widesttext-green-200">
                    Time for a peaceful break
                </p>

                <button onClick={onClose} className="mt-8 rounded-xl bg-lime-200 px-8 py-3 font-semibold text-green-950 transition hover:bg-lime-100">
                    Enjoy your break
                </button>
            </div>
        )
    }


    return(

        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto bg-green-950 px-4 py-6 text-white">

            <button onClick={handleStop} className="absolute right-6 top-6 rounded-full bg-white/10 p-3 transition hover:bg-white/20">
                <X size={24} />
            </button>

            <div className="text-center">

                <Music size={32} className="mx-auto mb-4 text-lime-200" />

                <h2 className="text-3xl font-bold">
                    Enter your focus zone
                </h2>     

                <p className="mt-2 text-green-200 mb-3">
                    Let the world wait. This time is yours
                </p>    
                <MusicPlayer isActive={true}/>

                <div className="my-8 sm:my-10">
                    <p className="text-8xl font-bold tabular-nums">
                        {formattedTime}
                    </p>

                    <p className="mt-3 text-sm uppercase tracking-[0.3em] text-green-200">
                        Focus session
                    </p>

                <div className="mt-3 flex items-center justify-center gap-4">

                    <button onClick={() => setIsRunning(!isRunning)} className="rounded-full bg-lime-200 p-5 text-green-950 transition hover:scale-105">
                        { isRunning ? <Pause size={28} /> : <Play size={28} />}
                    </button>
                </div>

                <p className="mt-6 text-sm text-green-200">
                    Lofi music · Deep focus
                </p>

                </div>       
            </div>

            {showStopConfirm && (

                <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
                    <div className="w-full max-w-sm rounded-3xl border border-white/20 bg-green-950 p-7 text-center shadow-2xl">
                    <h3 className="text-xl font-bold text-white">
                        Don't give up just yet
                        </h3>

                        <p className="mt-3 text-sm leading-relaxed text-green-200">

                            You came here to focus, and you deserve to finish what you started. Don't let a moment of distraction decide for you. Take a deep breath, and ask yourself: do I really need to stop now?

                        </p>

                        <div className="mt-6 flex gap-3">
                            <button onClick={() => setShowStopConfirm(false)} className="flex-1 rounded-xl border border-white/20 px-4 py-3 text-white transition hover:bg-white/10">
                                Keep focusing 
                            </button>

                            <button onClick={onClose} className="flex-1 rounded-xl bg-lime-200 px-4 py-3 font-semibold text-green-950 transition hover:bg-lime-100">
                                Stop session
                            </button>
                        </div>
                        </div>
                </div>
            )}
        </div>
    )

}