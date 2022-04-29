import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import "./index.scss";
import CardComponent from "../components/Card";
import { createSetOf13Cards, Card } from "../constants";
import DisplayResult from "../components/DisplayResult";
import Starter from "../components/Starter";

const Index = () => {
    const [viewInstruction, setViewInstruction] = useState(false);
    const [cards, setCards] = useState<Array<Card>>([]);
    const [dealersCards, setDealersCards] = useState<Array<Card>>([]);
    const [playerCards, setPlayerCards] = useState<Array<Card>>([]);
    const [turn, setTurn] = useState(false);
    const [win, setWin] = useState(false);
    const [lose, setLose] = useState(false);
    const [draw, setDraw] = useState(false);
    const [stickActivated, setStickActivated] = useState(false);
    const [change, setChange] = useState(false);
    const [ended, setEnded] = useState(false);
    const [dealerFinalHand, setDealerFinalHand] = useState(0);
    const [playerFinalHand, setPlayerFinalHand] = useState(0);
    
    // load cards to create a standard set of 52 cards
    useEffect(() => {
        const temp = [];
        temp.push(...createSetOf13Cards(<FavoriteIcon fontSize="small" htmlColor="black" />, "black"));
        temp.push(...createSetOf13Cards(<FavoriteBorderIcon fontSize="small" htmlColor="black" />, "black"));
        temp.push(...createSetOf13Cards(<FavoriteIcon fontSize="small" htmlColor="red" />, "red"));
        temp.push(...createSetOf13Cards(<FavoriteBorderIcon fontSize="small" htmlColor="red" />, "red"));
        setCards(temp);
    }, []);

    // serve cards to player and dealer at game start
    useEffect(() => {
        if (!cards.length) return;
        if (cards.length && playerCards.length >= 2 && dealersCards.length >= 1) return;
        const random = Math.round(Math.random() * 100) % cards.length;
        const newCard = cards[random];
        const servedCards = !turn ? [...playerCards, newCard] : [...dealersCards, newCard];
        !turn ? setPlayerCards(servedCards) : setDealersCards(servedCards);
        setTurn(!turn);

        //remove drawn card from set of cards
        const temp = [...cards];
        temp.splice(random, 1);
        setCards(temp);
    }, [cards, dealersCards, playerCards, turn]);
    
    // draw cards for dealer when player chooses to stick
    useEffect(() => {
        if (!cards.length || !stickActivated || ended || win || lose || draw) return;
        const random = Math.round(Math.random() * 100) % cards.length;
        const drawnCard = cards[random];
        const temp = [...dealersCards, drawnCard];
        setDealersCards(temp);
        
        // check if dealers hand bust after drawing
        const ace = temp.find(card => card.name === 'A');
        let dealersHand = temp.reduce((a, b) => a + (b?.value || 0), 0);
        if (ace && ace.value2 && dealersHand + ace.value2 <= 21) {
            dealersHand += ace.value2;
        } else {
            if (ace?.value1) dealersHand += ace.value1;
        }
        setDealerFinalHand(dealersHand);
        if (dealersHand > 21) {
            setWin(true);
            return;
        }
        if (dealersHand >= 17 && dealersHand <= 21) {
            setEnded(true);
            return;
        }
        setChange(!change);
    }, [change, stickActivated, cards, dealersCards, ended, win, lose, draw]);
    
    // check if players hand bust after hit
    useEffect(() => {
        const ace = playerCards.find(card => card.name === 'A');
        let playerHand = playerCards.reduce((a, b) => a + (b?.value || 0), 0);
        if (ace && ace.value2 && playerHand + ace.value2 <= 21) {
            playerHand += ace.value2;
        } else {
            if (ace?.value1) playerHand += ace.value1;
        }
        setPlayerFinalHand(playerHand);
        if (playerHand > 21) {
            setLose(true);
            return setStickActivated(false);
        }
    }, [playerCards]);
    
    // check for win or lose or draw when no hands have bust
    useEffect(() => {
        if (ended && !win && !lose) {
            if (dealerFinalHand > playerFinalHand) {
                setLose(true);
            }
            if (dealerFinalHand === playerFinalHand) {
                setDraw(true);
            }
            if (dealerFinalHand < playerFinalHand) {
                setWin(true);
            }
        }
    }, [ended, win, lose, dealerFinalHand, playerFinalHand]);

    const hit = () => {
        const random = Math.round(Math.random() * 100) % cards.length;
        const cardDrawn = cards[random];
        setPlayerCards([...playerCards, cardDrawn]);

        //remove drawn card from set of cards
        const temp = [...cards];
        temp.splice(random, 1);
        setCards(temp);
    }

    const stick = () => {
        setStickActivated(true);
    }

    const displayInstruction = () => {
        setViewInstruction(true);
    }

    if (!localStorage.getItem('INSTALLED') || viewInstruction) {
        return <Starter {...{ viewInstruction, setViewInstruction }} />
    }
    
    return (
        <div className="black-jack-root">
            {(win || lose || draw) && <DisplayResult {...{ win, lose, draw }} />}
            <div className="bjr-body">
                <div className="dealer dealer-container">
                    <div className="designator-div"><h2>dealer</h2></div>
                    <div className="cards-div">
                        {dealersCards.map((card, idx) => (
                            <CardComponent
                                key={idx}
                                name={card.name}
                                context={card.value || card.value1 || card.value2}
                                image={card.image}
                                color={card.color}
                            />
                        ))}
                    </div>
                </div>
                <hr />
                <div className="player player-container">
                    <div className="cards-div">
                        {playerCards.map((card, idx) => (
                            <CardComponent
                                key={idx}
                                name={card.name}
                                context={card.value || card.value1 || card.value2}
                                image={card.image}
                                color={card.color}
                            />
                        ))}
                    </div>
                    <div className="designator-div"><h2>player 1</h2></div>
                </div>
                <div className="buttons-div">
                    <Button
                        className="btn"
                        variant="outlined"
                        onClick={hit}
                        disabled={stickActivated || win || lose}
                    >hit</Button>
                    <Button
                        className="btn"
                        variant="outlined"
                        onClick={stick}
                        disabled={stickActivated || win || lose}
                    >stick</Button>
                    <Button
                        variant="outlined"
                        onClick={displayInstruction}
                        disabled={stickActivated || win || lose}
                    ><InfoOutlinedIcon /></Button>
                </div>
            </div>
        </div>
    );
};

export default Index;
