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

        <section className="mt-10 mb-8">
            <div className="flex items-center gap-3">

                <Sun className="text-yellow-300" size={30} />
                <h2 className="text-3xl md:text-4xl font-bold text-white">

                    {greeting}, {name}!
                </h2>
            </div>
            <p className="mt-2 text-green-100 text-sm md:text-base">
                {date}
            </p>

            <p className="mt-3 text-white/90">
             Just learn or Code for just 5 minutes!
            </p>
        </section>
    )
}