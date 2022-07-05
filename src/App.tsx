import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { Board } from './components/Board'
import { useAppSelector } from './store/store'

function App() {

  const board = useAppSelector(state => state.board)
  const figures = useAppSelector(state => state.figures)

  return (
    <Canvas style={{ width: '100vw', height: '100vh' }} shadows>
      <directionalLight
        castShadow
        position={[2.5, 8, 5]}
        intensity={1.5}
      />
      <OrbitControls />
      <Environment preset='apartment' background />
      <Suspense fallback={null}>
        <Environment preset='dawn' background />
        {figures.map(({ Figure, id, color, position }) => {
          return (
            <Figure key={id} id={id} color={color} position={position} />
          )
        })}
        <Board board={board} />
      </Suspense>
    </Canvas>
  )
}

export default App
