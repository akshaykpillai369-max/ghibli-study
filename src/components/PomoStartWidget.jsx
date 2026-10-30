import { Play, Timer } from "lucide-react";

export default function PomoStartWidget({onstart}){


    return(

        <div className="rounded-3xl border border-white/20 bg-green-950/60 p-6 text-white shadow-xl backdrop-blur-md">

            <div className="flex items-center gap-2">

                <Timer size={22} className="text-lime-200"/>

                <h3 className="font-semibold">
                    Focus
                </h3>
            </div>

            <p className="mt-4 text-4xl font-bold tabular-nums">

                25:00
            </p>

            <p className="mt-2 text-sm text-green-100">
                Ready for a focused session?
            </p>

            <button onClick={onstart} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-lime-200 px-4 py-3 font-semibold text-green-950 transition hover:bg-lime-100">
                <Play size={18} />
                Start focusing
            </button>
        </div>
    )
}