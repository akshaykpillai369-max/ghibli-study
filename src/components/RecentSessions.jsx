import { useState, useEffect } from "react";
import { Clock, CalendarDays } from "lucide-react";

export default function RecentSessions(){

    const [sessions, setSessions] = useState([])

    useEffect(() => {

        const history = JSON.parse(localStorage.getItem('ghibli-session-history') || '[]')

        setSessions(history.reverse())

    }, [])

    return(

        <section>
            <h2 className="text-2xl font-bold text-white">
                Recent Focus Sessions
            </h2>

            <div className="mt-5 space-y-3">

                {sessions.length === 0 ? (

                    <p className="text-green-100">No focus sessions yet. Start your first one!</p>
                ) : (

                    sessions.map((session, index) => (

                        <div key={index} className="flex items-center justify-between rounded-xl border border-white/20 bg-green-950/80 p-4 text-white">
                            <div className="flex items-center gap-3">
                                <Clock size={20} className="text-lime-200 "/>
                                <div>
                                    <p className="font-semibold">Focus session</p>
                                    <p className="text-sm text-green-200">
                                        {new Date(session.date).toLocaleString('en-IN')}
                                    </p>
                                </div>
                            </div>
                            <span className="font-semibold text-line-200">
                                {session.duration} min
                            </span>
                        </div>
                    ))
                )}
            </div>
        </section>
    )

}