import { useState, useEffect } from "react";
import { Clock, CalendarDays } from "lucide-react";

export default function RecentSessions(){

    const [sessions, setSessions] = useState([])
    const [showConfirm, setShowConfirm] = useState(false)

    useEffect(() => {

        const history = JSON.parse(localStorage.getItem('ghibli-session-history') || '[]')

        setSessions(history.reverse())

    }, [])

    function clearHistory(){

        localStorage.removeItem('ghibli-session-history')
        setSessions([])
        setShowConfirm(false)
        
    }

    return(

        <section>
            <div className="flex items-center justify-between mt-3">
            <h2 className="text-2xl font-bold text-white">
                Recent Focus Sessions
            </h2>

            {sessions.length > 0 && (

                <button onClick={() => setShowConfirm(true)} className="rounded-lg border border-red-300/30 bg-red-500/50 px-4 py-2 text-sm text-red-100 transition hover:bg-red-500/40">

                    Clear History
                </button>
            )}

            </div>

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
            {showConfirm && (

                <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
                    <div className="w-full max-w-sm rounded-3xl border border-white/20 bg-green-950 p-7 text-center text-white shadow-2xl">
                    <h3 className="text-xl font-bold">Clear all history?</h3>

                    <p className="mt-3 text-sm text-greem-200">
                        This will permanently delete all your completed focus sessions
                    </p>

                    <div className="mt-6 flex gap-3">
                        <button onClick={() => setShowConfirm(false)} className="flex-1 rounded-xl border border-white/20 px-4 py-3 hover:bg-white/10">
                            Cancel
                        </button>

                        <button onClick={clearHistory} className="flex-1 rounded-xl bg-red-500 px-4 py-3 font-semibold text-white hver:bg-red-600">
                            Clear
                        </button>
                    </div>
                    </div>
                </div>
            )}
        </section>
    )

}