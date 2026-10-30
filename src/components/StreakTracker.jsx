import { useState, useEffect } from "react";
import { Flame, Trophy, CalendarCheck } from "lucide-react";

export default function StreakTracker(){

    const [currentStreak, setCurrentStreak] = useState(0)
    const [longestStreak, setLongestStreak] = useState(0)

    useEffect(() => {

        const history = JSON.parse(localStorage.getItem('ghibli-session-history') || '[]')
        const studyDates = [...new Set(history.map(session => new Date(session.date).toDateString()))]
        const today = new Date()
        today.setHours(0,0,0,0)

        let streak = 0

        while(true){

            const checkDate = new Date(today)
            checkDate.setDate(today.getDate() - streak)
            if(studyDates.includes(checkDate.toDateString())){

                streak++
            }
            else{

                break
            }
        }
        setCurrentStreak(streak)
        let longest = 0
        let current = 0

        const sortedDates = studyDates.map(date => new Date(date)).sort((a,b) => a-b)
        sortedDates.forEach((date, index) => {

            if(index === 0){

                current = 1
            }
            else{

                const previousDate = sortedDates[index -1]
                const difference = (date - previousDate) / (1000 * 60 * 60 * 24)

                current = difference === 1 ? current + 1 : 1
            }
            longest = Math.max(longest, current)
        })

        setLongestStreak(longest)
    }, []) 

    return(
        <div className="rounded-3xl border border-white/20 bg-green-950/80 p-6 text-white shadow-xl backdrop-blur-md">
            <h2 className="text-xl font-bold">Study Streak</h2>

            <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/10 p-4">
                <Flame size={28} className="text-orange-300" />
                <p className="mt-3 text-3xl font-bold">{currentStreak}</p>
                <p className="text-sm text-green-200">Current streak</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                <Trophy size={28} className="text-yellow-300" />
                <p className="mt-3 text-3xl font-bold">{longestStreak}</p>
                <p className="text-sm text-green-200">Longest streak</p>
                </div>

            
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-green-200">
                <CalendarCheck size={18} />
                {currentStreak > 0 ? "You've studied today. Keep it going!" : "Complete a focus session today to start your streak."}
            </div>
        </div>
    )
}