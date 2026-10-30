import { useState, useEffect } from "react";
import { Clock, Target, CalendarDays} from "lucide-react";

export default function SessionHistory(){

    const[sessions, setSessions] = useState([])

    useEffect(() => {

        const savedSessions = JSON.parse(localStorage.getItem('ghibli-session-history') || '[]')

        setSessions(savedSessions)
    }, [])

    const totalSessions = sessions.length

    const totalMinutes = sessions.reduce((total, session) => total + session.duration, 0 )

    const today = new Date().toDateString()

    const todaySessions = sessions.filter((session) => new Date(session.date).toDateString() === today).length

    const hours = Math.floor(totalMinutes/60)
    const minutes = totalMinutes % 60

    const formattedFocusTime = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
    return (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

            <div className="rounded-2xl border border-white/20 bg-green-950/60 p-5 text-white shadow-lg backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <Target className="text-lime-200" size={24} />
                    <p className="text-sm text-green-100">Total Sessions</p>

                </div>

                <p className="mt-4 text-3xl font-bold">{totalSessions}</p>
                </div>

                <div className="rounded-2xl border border-white/20 bg-green-950/60 p-5 text-white shadow-lg backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <Clock className="text-lime-200" size={24} />
                    <p className="text-sm text-green-100">Total Focus Time</p>
                </div>
                <p className="mt-4 text-3xl font-bold">{formattedFocusTime}</p>


                </div>

                <div className="rounded-2xl border border-white/20 bg-green-950/60 p-5 text-white shadow-lg backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <CalendarDays className="text-lime-200" size={24} />
                    <p className="text-sm text-green-100">Today's Sessions</p>
                </div>
                    <p className="mt-4 text-3xl font-bold">{todaySessions}</p>
                </div>
            </div>


    
    )
}