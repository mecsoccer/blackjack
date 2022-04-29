import React from "react";
import { Button, Dialog, DialogTitle } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded';
import "./display-result.scss";

interface Props {
    win: boolean;
    lose: boolean;
    draw: boolean;
}

const DisplayResult: React.FC<Props> = ({ win, lose, draw }) => {
    const restart = () => {
        window.location.reload();
    }

    return (
        <div className="display-result-6jjdssd">
            <Dialog open={win || lose || draw}>
                <div className="dr6-icons">
                    {win && <CheckCircleRoundedIcon color="success" fontSize="inherit"/>}
                    {lose && <ErrorIcon color="error" fontSize="inherit"/>}
                    {draw && <HourglassBottomRoundedIcon color="warning" fontSize="inherit"/>}
                </div>
                <DialogTitle>
                    {win && 'Yay!!! You Have won this game. Black Jack Pays 3 to 2'}
                    {lose && 'You Have lost this game. You Pay 2 to 1'}
                    {draw && 'You Have drawn this game. Click restart to play again'}
                </DialogTitle>
                <div className="dr6-actions">
                    <Button onClick={restart}>Restart</Button>
                </div>
            </Dialog>
        </div>
    )
}

export default DisplayResult;
