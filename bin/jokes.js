#! /usr/bin/env node

const chalk = require('chalk');
const boxen = require('boxen');
const yargs = require('yargs');
const axios = require('axios');
const { option } = require('yargs');


const boxenOptions = {
    padding: 1,
    borderStyle: 'round'
}

const yargsOptions = yargs
.usage("Usage: -n <string>")
.option("n", { alias: "name", describe: "input your name", type: "string", demandOption: true})
.option("s", { alias: "search", describe: "search term", type: "string"})
.argv;

const greeting = `hello ${yargsOptions.name}`;

if(yargsOptions.search){
    console.log(`Searching for jokes about ${yargsOptions.search}`);
}else {
    console.log(`Lemme fetch a random joke:`)
}

const url = yargsOptions.search ? `https://icanhazdadjoke.com/search?term=${yargsOptions.search}&/limit=1`: `https://icanhazdadjoke.com/`;

axios.get(url, { headers: {Accept: "application/json"}}  )
.then(res => {
    if (yargsOptions.search) {
        res.data.results.forEach( j => {
            console.log(chalk.blue.bold(`\n ${j.joke}`));
        })
    }else {
        console.log(chalk.red.bold(res.data.joke));
    }
})


console.log(boxen(greeting, boxenOptions));
