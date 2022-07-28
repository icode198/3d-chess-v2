import React, { useCallback } from 'react'
import { Environment, OrbitControls } from '@react-three/drei'
import Board from './Board/Board'
import { Canvas } from '@react-three/fiber'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { Square } from 'chess.js'
import { chess, getAvailableMoves, setSelectCell, updateBoard } from '../../store/boardSlice'

const Scene = () => {

  const dispatch = useAppDispatch()
  const { board, figures, selectedCell, availableMoves } = useAppSelector(state => state.game)

  const onCellSelect = useCallback((cell: Square) => {
    dispatch(setSelectCell(cell))
    dispatch(getAvailableMoves(chess.moves({ square: cell, verbose: true, legal: true })))
  }, [])

  const onFigureMove = useCallback((target: Square) => {
    if (selectedCell) {
      chess.move({ from: selectedCell, to: target, promotion: 'q'})
      dispatch(updateBoard())
    }
  }, [selectedCell])


  return (
   <>
     <Canvas style={{ width: '100%', height: '100%' }} shadows>
       <directionalLight
         castShadow
         position={[1, 10, 10]}
         intensity={3.5}
         receiveShadow
       />
       <OrbitControls />
       <Environment preset='night' background />
       <Board
         board={board}
         figures={figures}
         selectedCell={selectedCell}
         onCellSelect={onCellSelect}
         availableMoves={availableMoves}
         onFigureMove={onFigureMove} />
     </Canvas>
   </>
  )
}

export default Scene