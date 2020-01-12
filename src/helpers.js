export const randomSelect = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

export const randomNumberBetween = (min, max) => {
    return Math.random() * (1 + max - min) + min;
}