const fs = require('fs')
const path = require('path')
let file = fs.readFileSync(path.join(`${__dirname}/input.txt`), {encoding: 'utf8'});

let rounds = file.split("\n").map(round => round.split(" "));

const ENEMY_ROCK = 'A'
const ENEMY_PAPER = 'B'
const ENEMY_SCISSORS = 'C'

const ME_ROCK = 'X'
const ME_PAPER = 'Y'
const ME_SCISSORS = 'Z'
const DRAW = ME_PAPER
const WIN = ME_SCISSORS

const firstScore = rounds.reduce((previousValue, currentValue) => {
    let score = previousValue;
    const [enemy, me] = currentValue;

    // Points for choosing
    switch (me) {
        case ME_ROCK: {
            score += 1;
            break;
        }
        case ME_PAPER: {
            score += 2;
            break;
        }
        case ME_SCISSORS: {
            score += 3;
            break;
        }
    }

    // Points for round Outcome
    switch (enemy) {
        case ENEMY_ROCK: {
            if (me === ME_PAPER) {
                score += 6;
            } else if (me === ME_ROCK) {
                score += 3;
            }
            break;
        }
        case ENEMY_PAPER: {
            if (me === ME_SCISSORS) {
                score += 6;
            } else if (me === ME_PAPER) {
                score += 3;
            }
            break;
        }
        case ENEMY_SCISSORS: {
            if (me === ME_ROCK) {
                score += 6;
            } else if (me === ME_SCISSORS) {
                score += 3;
            }
            break;
        }
    }


    return score;


}, 0)
const secondScore = rounds.reduce((previousValue, currentValue) => {
    let score = previousValue;
    const [enemy, me] = currentValue;

    switch (enemy) {
        case ENEMY_ROCK: {
            if(me === WIN) {
                score += 6;

                score += 2;
            } else if (me === DRAW ){
                score += 3;

                score += 1;
            } else {
                score += 3;

            }
            break;
        }
        case ENEMY_PAPER: {
            if(me === WIN) {
                score += 6;

                score += 3;
            } else if (me === DRAW ){
                score += 3;

                score += 2;

            } else {

                score += 1;

            }
            break;
        }
        case ENEMY_SCISSORS: {
            if(me === WIN) {
                score += 6;

                score += 1;

            } else if (me === DRAW ){
                score += 3;

                score += 3;

            } else {

                score += 2;
            }
            break;
        }
    }


    return score;


}, 0)
console.log(`First: ${firstScore}, Second: ${secondScore}`);