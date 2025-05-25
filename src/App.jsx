"use client"

import { useState, useEffect, useCallback } from "react"
import "./App.css"

const GAME_HEIGHT = 600
const GAME_WIDTH = 400
const BIRD_SIZE = 20
const PIPE_WIDTH = 60
const PIPE_GAP = 150
const GRAVITY = 0.6
const JUMP_STRENGTH = -12
const PIPE_SPEED = 3

export default function FlappyBird() {
  const [birdPosition, setBirdPosition] = useState(250)
  const [birdVelocity, setBirdVelocity] = useState(0)
  const [pipes, setPipes] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)

  const jump = useCallback(() => {
    if (!gameStarted) {
      setGameStarted(true)
    }
    if (!gameOver) {
      setBirdVelocity(JUMP_STRENGTH)
    }
  }, [gameStarted, gameOver])

  const resetGame = () => {
    setBirdPosition(250)
    setBirdVelocity(0)
    setPipes([])
    setGameStarted(false)
    setGameOver(false)
    setScore(0)
  }

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Space") {
        e.preventDefault()
        if (gameOver) {
          resetGame()
        } else {
          jump()
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [jump, gameOver])

  // Game loop
  useEffect(() => {
    let gameLoop

    if (gameStarted && !gameOver) {
      gameLoop = setInterval(() => {
        // Update bird physics
        setBirdVelocity((velocity) => velocity + GRAVITY)
        setBirdPosition((position) => {
          const newPosition = position + birdVelocity

          // Check ground and ceiling collision
          if (newPosition < 0 || newPosition > GAME_HEIGHT - BIRD_SIZE) {
            setGameOver(true)
            return position
          }

          return newPosition
        })

        // Update pipes
        setPipes((currentPipes) => {
          const newPipes = currentPipes
            .map((pipe) => ({
              ...pipe,
              x: pipe.x - PIPE_SPEED,
            }))
            .filter((pipe) => pipe.x > -PIPE_WIDTH)

          // Add new pipe
          if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < GAME_WIDTH - 200) {
            const pipeHeight = Math.random() * (GAME_HEIGHT - PIPE_GAP - 100) + 50
            newPipes.push({
              x: GAME_WIDTH,
              height: pipeHeight,
              passed: false,
            })
          }

          // Check for scoring
          newPipes.forEach((pipe) => {
            if (!pipe.passed && pipe.x + PIPE_WIDTH < 50) {
              pipe.passed = true
              setScore((s) => s + 1)
            }
          })

          return newPipes
        })
      }, 20)
    }

    return () => clearInterval(gameLoop)
  }, [gameStarted, gameOver, birdVelocity])

  // Collision detection
  useEffect(() => {
    const birdLeft = 50
    const birdRight = birdLeft + BIRD_SIZE
    const birdTop = birdPosition
    const birdBottom = birdPosition + BIRD_SIZE

    pipes.forEach((pipe) => {
      const pipeLeft = pipe.x
      const pipeRight = pipe.x + PIPE_WIDTH

      if (birdRight > pipeLeft && birdLeft < pipeRight) {
        if (birdTop < pipe.height || birdBottom > pipe.height + PIPE_GAP) {
          setGameOver(true)
        }
      }
    })
  }, [birdPosition, pipes])

  return (
    <div className="game-container" onClick={gameOver ? resetGame : jump}>
      <div className="game-area">
        {/* Background */}
        <div className="background"></div>

        {/* Bird */}
        <div
          className="bird"
          style={{
            top: birdPosition,
            transform: `rotate(${Math.min(birdVelocity * 3, 45)}deg)`,
          }}
        ></div>

        {/* Pipes */}
        {pipes.map((pipe, index) => (
          <div key={index}>
            {/* Top pipe */}
            <div
              className="pipe pipe-top"
              style={{
                left: pipe.x,
                height: pipe.height,
              }}
            ></div>
            {/* Bottom pipe */}
            <div
              className="pipe pipe-bottom"
              style={{
                left: pipe.x,
                top: pipe.height + PIPE_GAP,
                height: GAME_HEIGHT - pipe.height - PIPE_GAP,
              }}
            ></div>
          </div>
        ))}

        {/* Ground */}
        <div className="ground"></div>

        {/* Score */}
        <div className="score">{score}</div>

        {/* Start screen */}
        {!gameStarted && !gameOver && (
          <div className="overlay">
            <h1>Flappy Bird</h1>
            <p>Click or press SPACE to start</p>
          </div>
        )}

        {/* Game over screen */}
        {gameOver && (
          <div className="overlay">
            <h1>Game Over!</h1>
            <p>Score: {score}</p>
            <p>Click or press SPACE to restart</p>
          </div>
        )}
      </div>
    </div>
  )
}
