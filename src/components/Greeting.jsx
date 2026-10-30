import { Sun } from "lucide-react";

export default function Greeting({name}){

    const today = new Date()

    const hour = today.getHours()

    const greeting =hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

    const date = today.toLocaleDateString('en-IN', {

        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    return(

        <section className="mt-10 mb-8 max-w-2xl rounded-3xl border border-white/15 bg-green-950/60 p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-3">

                <Sun className="text-yellow-300" size={30} />
                <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">

                    {greeting}, {name}!
                </h2>
            </div>
            <p className="mt-2 text-green-100 drop-shadow-md text-sm md:text-base">
                {date}
            </p>

            <p className="mt-3 text-white/90 drop-shadow-md">
             Just study or code for five minutes. That's how progress begins!
            </p>
        </section>
    )
}