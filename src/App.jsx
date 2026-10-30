import Header from "./components/Header"

export default function App() {
  
  return (
    <main className="min-h-screen relative overflow-hidden">
      
      <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: "url('/bg/forest.png')"
        }}/>


        <div className="absolute inset-0 bg-black/30"/>

        <div className="relative z-10 min-h-screen p-6 md:p-8">

          <Header/>

        </div>
      
    </main>
  )
}


