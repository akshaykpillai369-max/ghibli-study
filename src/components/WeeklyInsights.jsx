import { useState, useEffect } from "react";
import { CalendarCheck, Clock, Target, TrendingUp } from "lucide-react";

export default function WeeklyInsights(){

    const [insights, setInsights] = useState({daysStudied: 0, dailyAverage:0, totalSessions:0, consistency:0})

    function loadInsights(){

        const history = JSON.parse(localStorage.getItem('ghibli-session-history') || '[]')

        const today = new Date()
        today.setHours(0,0,0,0)

        const weekDates = []

        for(let i = 6;i>=0; i--){

            const date = new Date(today)
            date.setDate(today.getDate() -i)
            weekDates.push(date.toDateString())
        }

        const weeklySessions = history.filter(session => weekDates.includes(new Date(session.date).toDateString()))

        const studiedDates = new Set(weeklySessions.map(session => new Date(session.date).toDateString()))

        const daysStudied = studiedDates.size
        const totalSessions = weeklySessions.length
        const totalMinutes = weeklySessions.reduce((total, session) => total + session.duration, 0)

        setInsights({daysStudied, dailyAverage: Math.round(totalMinutes / 7), totalSessions, consistency: Math.round((daysStudied / 7) * 100 )})
    }

    useEffect(() => {

        loadInsights()
        window.addEventListener('ghibli-session-updated', loadInsights)

        return () => {
            window.removeEventListener('ghibli-session-updated', loadInsights)
        }
    }, [])
    return(

        <div className="rounded-3xl border border-white/20 bg-green-950/80 p-6 text-white shadow-xl backdrop-blur-md">

            <div className="flex items-center gap-2">

                <TrendingUp size={22} className="text-green-300" />
                <h2 className="text-xl font-bold">Weekly Insights</h2>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/10 p-4">
                <CalendarCheck size={22} className="text-green-300" />
                <p className="mt-3 text-2xl font-bold">
                    {insights.daysStudied} / 7
                </p>
                <p className="text-sm text-green-200">Days studied</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                <Clock size={22} className="text-green-300" />
                <p className="mt-3 text-2xl font-bold">
                    {insights.dailyAverage}m
                </p>
                <p className="text-sm text-green-200">Daily Average</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                <Target size={22} className="text-green-300" />
                <p className="mt-3 text-2xl font-bold">
                    {insights.totalSessions}
                </p>

                <p className="text-sm text-green-200">Total sessions</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                <TrendingUp size={22} className="text-green-300" />
                <p className="mt-3 text-2xl font-bold">
                    {insights.consistency}%
                </p>
                <p className="text-sm text-green-200">Consistency</p>
                </div>
            </div>




        </div>
    )
}