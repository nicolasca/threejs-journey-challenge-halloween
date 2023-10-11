import { useRef } from "react"
import { Canvas } from "@react-three/fiber"
import Experience from "./Experience"
import { useRoute, useLocation } from 'wouter'


export default function App() {
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()

  return (
    <>
      <Experience />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <a href="https://pmnd.rs/" style={{ position: 'absolute', bottom: 40, left: 90, fontSize: '13px' }}>
          Copyrights & Licences

        </a>
        <a style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }} href="#" onClick={() => setLocation('/')}>
          {params ? '< back' : 'double click to enter portal'}
        </a>
      </div>
    </>
  )
}