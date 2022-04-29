import React from "react";
import { CircularProgress } from "@mui/material";
import kingImage from "../../assets/images/blackjack-king.png";
import queenImage from "../../assets/images/blackjack-queen.webp";
import "./card.scss";

interface Props {
    name: string;
    image: string | JSX.Element;
    context: number | undefined;
    color: string;
    covered?: boolean;
    loading?: boolean;
}

const Card: React.FC<Props> = ({ name, image, context, color, covered, loading }) => {
    if (covered) return (
        <div className="card-suseiud">
            {loading && <CircularProgress size={20} />}
        </div>
    )
    return (
        <div className="card-suseiud">
            <div className="csd-top">
                <div style={{color}}>{name}</div>
                <div>{image}</div>
            </div>
            <div className="csd-center">
                {name === 'K' && <img src={kingImage} alt="King" />}
                {name === 'Q' && <img src={queenImage} alt="Queen" />}
                {name === 'J' && <img src={kingImage} alt="Jack" />}
                {(name !== 'K' && name !== 'Q' && name !== 'J' ) && Array(context).fill(2).map((el) => image)}
            </div>
            <div className="csd-bottom">
                <div>{image}</div>
                <div style={{color}}>{name}</div>
            </div>
        </div>
    )
}

export default Card;
