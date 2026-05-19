import { useState } from 'react'
import './App.css'
import Upload from '../src/components/Upload'

function App2() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <Upload />
        </div>
   
      </section>

    </>
  )
}

export default App
