import Layout from '../components/Layout'
import Link from 'next/link'
import Router from 'next/router'

const End = () => (
    <Layout>
        <div>
            <h2 className="text-center" style={{margin: "4rem 0rem"}}>Game finished</h2>
            <div>
                <p className="text-center" style={{margin: "13rem 0", color: "gray"}}>Thank you for playing!</p>

                <p className="text-center" onClick={newGame}>New Game</p>
                <Link href="/"><p className="text-center">Home</p></Link>
            </div>
        </div>
    </Layout>
)
export default End;


function newGame() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(res => res.json())
        .then(
            (result) => {
              Router.push('/game/' + result.deck_id)
            }
        )
  }