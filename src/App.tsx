import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [tiles, setTiles] = useState<{ mole: number | null; plant: number | null }>({
    mole: null,
    plant: null,
  });

  // Intervalos para actualizar Mole y Plant
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setTiles((prevTiles) => {
        let newMole, newPlant;

        do {
          newMole = getRandomTile();
        } while (newMole === prevTiles.plant); // Asegura que Mole no coincida con Plant

        do {
          newPlant = getRandomTile();
        } while (newPlant === newMole); // Asegura que Plant no coincida con Mole

        return { mole: newMole, plant: newPlant };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver]);

  const getRandomTile = () => Math.floor(Math.random() * 9);

  const handleTileClick = (index: number) => {
    if (gameOver) return;

    if (index === tiles.mole) {
      setScore((prevScore) => prevScore + 1);
    } else if (index === tiles.plant) {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setTiles({ mole: null, plant: null });
  };

  return (
    <div className="App">
      <h1>Whack a Mole</h1>
      <h2 id="score">{gameOver ? `GAME OVER: ${score}` : score}</h2>
      <div id="board">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} onClick={() => handleTileClick(index)}>
            {index === tiles.mole && (
              <img src="./Images/monty-mole.png" alt="Mole" />
            )}
            {index === tiles.plant && (
              <img src="./Images/piranha-plant.png" alt="Plant" />
            )}
          </div>
        ))}
      </div>
      {gameOver && <button onClick={resetGame}>Reiniciar</button>}
    </div>
  );
};

export default App