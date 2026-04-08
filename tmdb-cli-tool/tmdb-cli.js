#!/usr/bin/env node

require("dotenv").config({ quiet: true });
const axios = require("axios");
const chalk = require("chalk");
const ora = require("ora").default

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const args = process.argv.slice(2);
const typeIndex = args.indexOf("--type");
const type = typeIndex !== -1 ? args[typeIndex + 1] : null;

const allowedTypes = {
    playing: "now_playing",
    popular: "popular",
    top: "top_rated",
    upcoming: "upcoming"
};

if (!type || !(type in allowedTypes)) {
    console.log(
        chalk.red("Invalid command\n") +
        chalk.yellow("Usage: ") +
        chalk.cyan("tmdb-app --type <playing | popular | top | upcoming>")
    );
    process.exit(1);
}

const spinner = ora(`Fetching ${type} movies...`).start();

axios.get(`https://api.themoviedb.org/3/movie/${allowedTypes[type]}`, {
    headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        accept: "application/json"
    }
})
.then(response => {
    spinner.succeed(chalk.green(`Fetched ${type} movies successfully\n`));

    const movies = response.data.results.slice(0, 5);

    movies.forEach((movie, i) => {
        console.log(
            chalk.blue(`${i + 1}. ${movie.title}`) +
            chalk.gray(` (${movie.release_date})`)
        );
        console.log(
            chalk.magenta(`Rating: ${movie.vote_average}`)
        );
    });
})
.catch(error => {
    spinner.fail(chalk.red("Failed to fetch movies"));
    console.error(chalk.red(error.message));
});