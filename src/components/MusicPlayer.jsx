import { useState, useRef, useEffect } from "react";
import { Play, Pause, Music } from "lucide-react";

const tracks = [

    {
        name: 'Lofi Chill',
        artist: 'Watermello',
        src: `${import.meta.env.BASE_URL}sounds/lofi-chill.mp3`
    },

    {
        name: 'Calm Hiphop Lofi',
        artist: 'PocketBeats',
        src: `${import.meta.env.BASE_URL}sounds/pocketbeats.mp3`
    },

    {
        name: 'Tea',
        artist: 'Coldise',
        src: `${import.meta.env.BASE_URL}sounds/unminus.mp3`

    },
]

export default function MusicPlayer(){

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    const audioRef = useRef(null)

    const currentTrack = tracks[currentTrackIndex]

    useEffect(() => {

        const audio = audioRef.current
        if(!audio) return

        if(isPlaying){

            audio.play().catch(()=> {
                setIsPlaying(false)
            })
        }
            else{
                audio.pause()
            }
        
    }, [isPlaying, currentTrack])

    return(

        <div className="w-fullmax-w-sm rounded-3xl border border-white/20 bg-green-950/60 p-6 text-white shadow-xl backdrop-blur-md">

            <audio src={currentTrack.src} ref={audioRef} preload="metadata" />

            <div className="flex items-center gap-3">

                <Music size={24} className="text-lime-200" />
                <div>
                    <h3 className="font-semibold">Forest Radio</h3>
                    <p className="text-xstext-green-200">
                        Your peaceful soundtrack
                    </p>
                </div>
            </div>

            <div className="mt-6">
                <label className="mb-2 block text-sm text-green-200">
                    Choose your music
                </label>

                <select value={currentTrackIndex} onChange={(e)=> setCurrentTrackIndex(Number(e.target.value))} className="w-full rounded-xl border borer-white/20 bg-green-900 p-3 text-white outline-none focus:border-lime-200">
                    {tracks.map((track, index) => {

                        <option key={track.name} value={index}>
                            {track.name} - {track.artist}
                        </option>
                    })}
                </select>
            </div>

            <div className="mt-5 flex items-center justify-between">

                <div>

                    <p className="font semibold">{currentTrack.name}</p>
                    <p className="text-sm text-green-200">
                        {currentTrack.artist}
                    </p>
                </div>

                <button onClick={() => setIsPlaying(!isPlaying)} className="rounded-full bg-lime-200 p-4 text-green-950 transition hover:scale-105">
                    {isPlaying ? <Pause size={22} /> : <Play size={22} />}
                </button>
            </div>
        </div>
    )
}