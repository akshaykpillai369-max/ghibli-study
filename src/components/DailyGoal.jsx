import { useState, useEffect } from "react";
import { Target, Lock } from "lucide-react";

export default function DailyGoal(){

    const [dailyGoal, setDailyGoal] = useState(null)
    const [completedSessions, setCompletedSessions] = useState(0)
    const [isLocked, setIsLocked] = useState(false)

    useEffect(() => {

        const today = new Date().toLocaleDateString('en-CA')

        const savedGoal = JSON.parse(localStorage.getItem('ghibli-daily-goal') || 'null')

        if(savedGoal && savedGoal.date === today){

            setDailyGoal(savedGoal.Target)
            setIsLocked(true)
        }


    },[])

    useEffect(()=> {

        function loadTodaySessions(){

            const history = JSON.parse(localStorage.getItem('ghibli-session-history') || '[]')

            const today = new Date().toDateString()
            const count = history.filter((session) => new Date(session.date).toDateString() === today).length

            setCompletedSessions(count)
        }

        loadTodaySessions()
        window.addEventListener('focus', loadTodaySessions)
        window.addEventListener('ghibli-session-updated', loadTodaySessions)

        return () => {

            window.removeEventListener('focus', loadTodaySessions)
            window.removeEventListener('ghibli-session-updated', loadTodaySessions)
        }
    }, [])

    function saveDailyGoal(target){

        const today = new Date().toLocaleDateString('en-CA')
        const goalData = {

            target:target,
            date: today
        }

        localStorage.setItem('ghibli-daily-goal', JSON.stringify(goalData))

        setDailyGoal(target)
        setIsLocked(true)
    }


    const progress = dailyGoal ? Math.min((completedSessions/ dailyGoal) * 100, 100) : 0
    const remainingSessions = dailyGoal ? Math.max(dailyGoal - completedSessions, 0) : 0

    return(
        <>
        {!isLocked ? (
        <div className="rounded-3xl border border-white/20 bg-green-950/60 p-6 text-white shadow-xl backdrop-blur-md">

            <div className="flex items-center gap-3">
                <Target size={25} className="text-lime-200" />
                <h2 className="text-xl font-bold">Daily Focus Goal</h2>
            </div>

            <p className="mt-3 text-sm text-green-100">
                How many focus sessions do you want to complete today?
            </p>

            <div className="mt-5 grid grid-cols-5 gap-2">
                {[2, 4, 6, 8, 10].map((goal)=> (

                    <button key={goal} onClick={() => saveDailyGoal(goal)} className="rounded-xl border border-white/20 bg-white/10 py-3 font-semibold transition hover:bg-lime-200 hover:text-green-950 disabled:cursor-not-allowed disabled:opacity-40">
                        {goal}
                    </button>
                ))}
            </div>
        </div>

            ) : (
                
                <div className="rounded-3xl border border-white/20 bg-green-950/60 p-6 text-white shadow-xl backdrop-blur-md">
                   <div className="flex items-center gap-3">

                    <Target size={25} className="text-lime-200" />
                    <h2 className="text-xl font-bold">Daily Focus Goal</h2>
                    <Lock size={16} className="ml-auto text-green-200" />
                </div>
                <p className="mt-3 text-sm text-green-100">
                    {completedSessions} of {dailyGoal} sessions completed
                </p>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/20">
                    <div className="h-full rounded-full bg-lime-200 transition-all duration-500" style={{width : `${progress}%`}}/>
                    </div>

                    <p className="mt-3 text-sm text-green-100">
                        {remainingSessions > 0 ? `${remainingSessions} sessions remaining today` : 'Daily goal completed. Excellent work!'}
                    </p>
                </div>
                
            )}
            </>
    )
}