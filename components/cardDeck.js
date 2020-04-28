import React, { PureComponent } from 'react'
import Rules from '../rules.json'
import Router from 'next/router'
import Popup from 'reactjs-popup'
import style from './modal.module.css'
import desktopStyle from './desktop.module.css'

export default class cardDeck extends PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            rows: []
        };
    }
    
    componentDidMount(){
       this.setState({
           isLoaded: true,
           shuffled: true,
           remaining: 52,
           nextPlayer: -1
       })
       this.handleAddRow();
    }
    handleChange = idx => e => {
        const { name, value } = e.target;
        const rows = [...this.state.rows];
        rows[idx] = {
          [name]: value
        };
        this.setState({
          rows
        });
      };
      handleNewRow = idx => e => {
          if(idx + 1 == this.state.rows.length) {
              this.handleAddRow();
          }
      }
      handleAddRow = () => {
        const item = {
          name: ""
        };
        this.setState({
          rows: [...this.state.rows, item]
        });
      };
      handleRemoveRow = () => {
        this.setState({
          rows: this.state.rows.slice(0, -1)
        });
      };

      handlePlayerSave = () => {
        let players = this.state.rows.filter(item => item.name != undefined && item.name != "").map(item => {
            return item.name;   
        });
        this.setState({players: players});
      }
      handleNextPlayer = () => {
        if(this.state.nextPlayer == this.state.players.length -1) this.setState({nextPlayer: 0})
        else this.setState({nextPlayer: this.state.nextPlayer + 1})
      }
 
    nextCard = (event) => {
        if(this.state.remaining > 0){
            fetch("https://deckofcardsapi.com/api/deck/" + this.props.deck_id + "/draw/?count=1")
                .then(res => res.json())
                .then(
                    (result) => {
                        let rule = "";
                        if(["2", "3", "4"].indexOf(result.cards[0].value) >= 0){
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
        if(this.state.players) this.handleNextPlayer();
    }
    render() {
        // Old deck
        if(this.state.card) {
            if(this.state.players) {
                return (
                <div onClick={this.nextCard} style={{maxWidth: "20rem"}}>
                    <p style={{float: "left"}}>{this.state.remaining}/52</p><p className="text-center">{this.state.players[this.state.nextPlayer]}'s turn</p>
                    
                    <div className={desktopStyle.desktop}>
                        <img src={this.state.card.image} alt="Playing card" className={desktopStyle.image}/>
                        <div style={{marginTop: "0.5rem"}}>
                            <p>{this.state.rule}</p>
                        </div>
                    </div>
                </div>
                )
            }
            return (
                <div onClick={this.nextCard}>
                    <p>{this.state.remaining}/52</p>
                    <div className={desktopStyle.desktop}>
                        <img src={this.state.card.image} alt="Playing card" style={{width: '500px'}} className={desktopStyle.image}/>
                        <div className={desktopStyle.ruleBox} style={{marginTop: "0.5rem"}}>
                            <p className={desktopStyle.rules}>{this.state.rule}</p>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <h3 className="text-center">Welcome to a new game of Kings cup</h3>

                <p onClick={this.nextCard} className="text-center" style={{marginTop: "10rem"}}>Draw a card</p>
                <Popup trigger={
                <p className="text-center" style={{paddingTop: "30vh",  color: "gray"}}>Add players (optional)</p>} contentStyle={{width: "90%"}} modal>
                      {close => (
                        <div className={style.modal}>
                            <a className={style.close} onClick={close}>
                            &times;
                            </a>
                            <div className={style.header}> Add players</div>
                            <div className={style.content}>
                                <table  style={{width: "100%"}}>
                                    <tbody>
                                    {this.state.rows.map((item, idx) => (
                                        <tr id="addr0" key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>
                                            <input
                                            type="text"
                                            name="name"
                                            value={this.state.rows[idx].name}
                                            onChange={this.handleChange(idx)}
                                            onFocus={this.handleNewRow(idx)}
                                            className="form-control"
                                            />
                                        </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className={style.actions}>
                            <button
                                className={style.button}
                                onClick={() => {
                                this.handlePlayerSave();
                                close();
                                }}>
                                Save
                            </button>
                            </div>
                        </div>
                        )}
                    </Popup>
                    <p className="text-center" style={{paddingTop: "10px",  color: "gray"}} onClick={() => {
                        Router.push('/');
                    }}>Exit</p>
            </div>
        )
    }
}