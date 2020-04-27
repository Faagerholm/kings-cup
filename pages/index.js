import Layout from '../components/Layout'
import Router from 'next/router'


const Home = () => (
  <Layout>
    <div className="text-justify">
      <h1 className="text-center">Kings Cup</h1>
      <div style={{marginTop: "30vh"}}>
        <p onClick={newGame} className="btn text-center" style={{display: "block"}}>Start new Game</p>
        <p className="btn" style={{display: "block"}}>Join game</p>
        <p className="btn" style={{display: "block"}}>Stats</p>
      </div>
    </div>
  </Layout>
) 
export default Home;

function newGame() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(res => res.json())
      .then(
          (result) => {
            Router.push('/game/' + result.deck_id)
          }
      )
}