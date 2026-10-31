import { useState, useEffect } from "react";
import { BarChart3} from "lucide-react";

export default function WeeklyActivity(){

    const [weeklyData, setWeeklyData] = useState([])

    function loadWeeklyData(){

        const history = JSON.parse(localStorage.getItem('ghibli-session-history') || '[]')

        const today = new Date()
        today.setHours(0,0,0,0)

        const week = []

        for(let i =6; i>=0; i--){

            const date = new Date(today)
            date.setDate(today.getDate() - i)

            const sessions = history.filter(session => {

                const sessionDate = new Date(session.date)
                return sessionDate.toDateString() === date.toDateString()
            })

            const totalMinutes = sessions.reduce((total, session) => total + session.duration, 0)
            week.push({
                day: date.toLocaleDateString('en-US', {weekday: 'short'}), minutes : totalMinutes
            })
        }

        setWeeklyData(week)
    }

    const weeklyTotal = weeklyData.reduce((total, day) => total + day.minutes, 0)

    const productiveDay = weeklyData.reduce((best, day) => day.minutes > best.minutes ? day : best, {day: '-', minutes: 0})
    useEffect(() => {

        loadWeeklyData()
        window.addEventListener('ghibli-session-updated', loadWeeklyData)

        return () => {

            window.removeEventListener('ghibli-session-updated', loadWeeklyData)
        }
    }, [])

    return(

        <div className="rounded-3xl border border-white/20 bg-green-950/80 p-6 text-white shadow-xl backdrop-blur-md">

            <div className="flex items-center gap-2">

                <BarChart3 size={22} className="text-green-300" />
                <h2 className="text-xl font-bold">Weekly Activity</h2>
            </div>

            <div className="mt-6 flex items-end justify-between gap-3">

                {weeklyData.map((item, index) => (

                    <div key={index} className="flex flex-1 flex-col items-center gap-2">

                        <span className="text-xs text-green-200">
                            {item.minutes}m
                        </span>

                        <div className="flex h-32 w-full items-end rounded-xl bg-white/10">
                         <div className="w-full rounded-xl bg-green-400 transition-all" style={{height: `${Math.max((item.minutes / Math.max(...weeklyData.map(day => day.minutes),1)) * 100, item.minutes > 0 ? 5: 0)}%`}} />
                        </div>

                        <span className="text-xs text-green-200">
                            {item.day}
                        </span>

                    
                    </div>
                ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-green-200">Weekly Focus Time</p>
                <p className="mt-2 text-2xl font-bold">
                    {Math.floor(weeklyTotal / 60)}h {weeklyTotal % 60}m
                </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-green-200">Most Productive Day</p>
                <p className="mt-2 text-2xl font-bold">
                    {productiveDay.minutes > 0 ? productiveDay.day : '-'}
                </p>
                </div>
            </div>

        </div>
    )
}