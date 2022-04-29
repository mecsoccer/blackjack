import React from "react";
import { Button } from "@mui/material";
import "./starter.scss";
interface Props {
    viewInstruction: boolean;
    setViewInstruction: Function;
}

const Starter = ({ viewInstruction, setViewInstruction }: Props) => {
    const start = () => {
        localStorage.setItem('INSTALLED', 'INSTALLED');
        window.location.reload();
    }

    const continueWithGame = () => {
        setViewInstruction(false);
    }

    return (
        <div className="starter-ds727dsad">
            <h1>A simple game of Black Jack</h1>
            <h3>Rules of the game</h3>
            <div className="rules-div">
                <i>You are only allowed to hit or stick</i>
                <i>The value of an ACE is either 1 or 11</i>
                <i>Cards from 2 - 10 maintain their face value</i>
                <i>King, queen and Jack have a value of 10</i>
                <i>The dealer/player hand busts when sum of card values exceed 21</i>
            </div>
            <div className="btn-div">
                {viewInstruction 
                    ? (
                        <Button
                            className="btn"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={continueWithGame}
                        >continue</Button>
                    )
                    : (
                        <Button
                            className="btn"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={start}
                        >start</Button>
                    )
                }
            </div>
        </div>
    );
}

export default Starter;
