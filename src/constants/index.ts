export interface Card {
    name: string;
    value1?: undefined | number;
    value2?: undefined | number;
    value?: number | undefined;
    image: string | JSX.Element;
    color: string;
}

export const createSetOf13Cards = (image: JSX.Element, color: string): Card[] => [
    { name: 'A', value1: 1, value2: 11, image, color },
    { name: 'K', value: 10, image, color },
    { name: 'Q', value: 10, image, color },
    { name: 'J', value: 10, image, color },
    { name: '2', value: 2, image, color },
    { name: '3', value: 3, image, color },
    { name: '4', value: 4, image, color },
    { name: '5', value: 5, image, color },
    { name: '6', value: 6, image, color },
    { name: '7', value: 7, image, color },
    { name: '8', value: 8, image, color },
    { name: '9', value: 9, image, color },
    { name: '10', value: 10, image, color },
]