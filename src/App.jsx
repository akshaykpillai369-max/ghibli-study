export default function App() {
  
  return (
    <main className="min-h-screen relative overflow-hidden">
      
      <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: "url('/bg/forest.png')"
        }}/>


        <div className="absolute inset-0 bg-black/30"/>

        <div className="relative z-10 min-h-screen flex items-center justify-center">

          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            Ghibli Study
          </h1>
        </div>
      
    </main>
  )
}


