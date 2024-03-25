export default function Header({ currentScore, highScore }) {
  return (
    <>
      <section className="header">
        <h1>MEMORY CARD: President's Edition</h1>
        <div className="scores">
          <h2>High Score: {highScore}</h2>
          <h3>Current Score: {currentScore}</h3>
        </div>
      </section>
    </>
  );
}
