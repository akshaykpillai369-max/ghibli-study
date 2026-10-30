import { useState } from "react";
import { Leaf } from "lucide-react";

export default function Welcome({onSave}) {

    const [name, setName] = useState('')

    function handleSubmit(e){

        e.preventDefault()

        if(!name.trim()) return

        onSave(name.trim())
    }

    return(

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-5">

            <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl border border-white/20 bg-green-950/80 p-8 text-center shadow-2xl">
            
            <Leaf size={40} className="mx-auto mb-4 text-lime-200" />

            <h2 className="text-3xl font-bold text-white">
                Welcome, traveller
            </h2>

            <p className="mt-3 text-green-100">
                What should I call you, traveller ?
            </p>

            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" maxLength={30} className="mt-6 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/50 focus:border-lime-200" autoFocus/>
            
            <button type="submit" disabled={!name.trim()} className="mt-4 w-full rounded-xl bg-lime-200 px-4 py-3 font-semibold text-green-950 transition hover:bg-lime-100 disabled:cursor-not-allowed disabled:opacity-40">

                Enter to your peacful forest

                   
            </button> 
                
                </form>
        </div>
    )
}