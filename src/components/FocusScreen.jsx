import { Play, Pause, X, Volume2, Music } from "lucide-react";

export default function FocusScreen({onClose}){

    return(

        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-green-950 text-white">

            <button onClick={onClose} className="absolute right-6 top-6 rounded-full bg-white/10 p-3 transition hover:bg-white/20">
                <X size={24} />
            </button>

            <div className="text-center">

                <Music size={32} className="mx-auto mb-4 text-lime-200" />

                <h2 className="text-3xl font-bold">
                    Enter your focus zone
                </h2>     

                <p className="mt-2 text-green-200">
                    Let the world wait. This time is yours
                </p>    

                <div className="my-12">
                    <p className="text-8xl font-bold tabular-nums">
                        25:00
                    </p>

                    <p className="mt-3 text-sm uppercase tracking-[0.3em] text-green-200">
                        Focus session
                    </p>

                <div className="flex items-center justify-center gap-4">

                    <button className="rounded-full border border-white/20 bg-white/10 p-5 transition hover:bg-white/20">
                        <Volume2 size={26} />
                    </button>
                </div>

                <p className="mt-6 text-sm text-green-200">
                    Lofi music · Deep focus
                </p>
                
                </div>       
            </div>
        </div>
    )

}