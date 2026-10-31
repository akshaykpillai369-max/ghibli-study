import { Leaf, Settings } from "lucide-react";

export default function Header(){

    return(

        <header className="flex items-center justify-between p-5 rounded-2xl bg-green-950/50 backdrop-blur-md border border-white/20">

            <div className="flex items-center gap-3">

                <Leaf size={28} className="text-lime-200"/>

                <div>

                    <h1 className="text-2xl font-bold text-white">
                        Ghibili Study
                    </h1>

                    <p className="text-sm text-green-100">
                        Your little corner of productivity
                    </p>
                </div>

            </div>

        </header>
    )
}