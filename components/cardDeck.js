import React, { PureComponent } from 'react'
import Rules from '../rules.json'
import Router from 'next/router'

export default class cardDeck extends PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    componentDidMount(){
       this.setState({
           isLoaded: true,
           deck_id: this.props.deck_id,
           shuffled: true,
           remaining: 52
       })
    }

    nextCard = (event) => {
        if(this.state.remaining > 0){
            fetch("https://deckofcardsapi.com/api/deck/" + this.props.deck_id + "/draw/?count=1")
                .then(res => res.json())
                .then(
                    (result) => {
                        let rule = "";
                        if(["2", "3", "4", "5"].indexOf(result.cards[0].value) >= 0){
                            rule = Rules["basic"][result.cards[0].value][result.cards[0].suit]
                        }else {
                            rule = Rules["basic"][result.cards[0].value]
                        }

                        this.setState({
                            card: result.cards[0],
                            remaining: result.remaining,
                            rule: rule
                        })
                        if(result.cards[0].value == "KING") {
                            if(this.state.kingCount){
                                this.setState({kingCount: this.state.kingCount + 1})
                            }else {
                                this.setState({kingCount: 1})
                            }
                        }
                    }
                )
        }else {
            Router.push('/end')
        }
    }
    render() {
        // Old deck
        if(this.state.card) {
            return (
                <div onClick={this.nextCard} style={{maxWidth: "20rem"}}>
                    <p className="text-center">{this.state.remaining} cards remaining</p>
                        <img src={this.state.card.image} alt="Playing card" style={{width: 100 + '%'}}/>
                    <div style={{marginTop: "1rem", borderTop: "solid 2px black", paddingTop: "1rem"}}>
                        <p>{this.state.rule}</p>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <h4>Welcome to a new game of Kings cup</h4>
                <p onClick={this.nextCard} className="text-center" style={{marginTop: "40vh"}}>Draw the first card</p>
            </div>

        )
    }
}