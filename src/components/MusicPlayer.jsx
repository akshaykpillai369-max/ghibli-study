import { useState, useRef, useEffect} from "react";
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

export default function MusicPlayer({isActive}){

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(isActive)
    const [volume, setVolume] = useState(0.5)

    const audioRef = useRef(null)

    const currentTrack = tracks[currentTrackIndex]

    useEffect(() => {

        const audio = audioRef.current
        if(!audio) return

        if(!isActive){
            audio.pause()
            audio.currentTime = 0
            setIsPlaying(false)
            return
        }

        if(isPlaying){

            audio.play().catch(()=> setIsPlaying(false))
        }
        else{

            audio.pause()
        }
    }, [isActive, isPlaying, currentTrack])

    

    useEffect(()=> {

        if(audioRef.current){

            audioRef.current.volume = volume
        }
    }, [volume])


    return(

        <div className="w-full max-w-sm rounded-3xl border border-white/20 bg-green-950/60 p-6 text-white shadow-xl backdrop-blur-md">

            <audio src={currentTrack.src} ref={audioRef} preload="metadata" />

            <div className="flex items-center gap-3">

                <Music size={24} className="text-lime-200" />
                <div>
                    <h3 className="font-semibold">Forest Radio</h3>
                    <p className="text-xs text-green-200">
                        Your peaceful soundtrack
                    </p>
                </div>
            </div>

            <div className="mt-6">
                <label htmlFor="music-track" className="mb-2 block text-sm text-green-200">
                    Choose your music
                </label>

                <select id="music-track" value={currentTrackIndex} onChange={(e)=> setCurrentTrackIndex(Number(e.target.value))} className="w-full rounded-xl border border-white/20 bg-green-900 p-3 text-white outline-none focus:border-lime-200">
                    {tracks.map((track, index) => (

                        <option key={track.name} value={index} className="bg-green-950 text-white">
                            {track.name} - {track.artist}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mt-5 flex items-center justify-between">

                <div>

                    <p className="font-semibold">{currentTrack.name}</p>
                    <p className="text-sm text-green-200">
                        {currentTrack.artist}
                    </p>
                </div>

                <button onClick={() => setIsPlaying(previous => !previous)} disabled={!isActive} className="rounded-full bg-lime-200 p-4 text-green-950 transition hover:scale-105">
                    {isPlaying ? <Pause size={22} /> : <Play size={22} />}
                </button>

                <div className="mt-5">

                    <div className="mb-2 flex justify-between text-sm text-green-200">

                        <label htmlFor="music-volume">Volume</label>
                        <span>{Math.round(volume * 100)} % </span>
                    </div>

                    <input id="music-volume" type="range" min={0} max={1} step={0.01} value={volume} onChange={(e)=> setVolume(Number(e.target.value))} className="w-full accent-lime-200"/>
                </div>
            </div>
        </div>
    )
}