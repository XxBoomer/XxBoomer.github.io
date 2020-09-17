const axios = require("axios");
const inquirer = require("inquirer");
const fs = require('fs');
const util = require("util");
//const writeFileAsync = util.promisify(fs.writeFile);

// Decalre global variables
var avatar_url, email, name;
// Initialize to get user's information
init();

const questions = [
  {
    message: "Enter your project's title:",
    name: "title"
  },
  {
    message: "Enter your project's description:",
    name: "description"
  },
  {
    message: "Enter table of content",
    name: "toc"
  },
  {
    message: "Enter installation note:",
    name: "installation"
  },
  {
    message: "Enter usage note:",
    name: "usage"
  },
  {
    type: "list",
    message: "Pick a license for your project",
    name: "license",
    choices: [
      "Apache 2.0 License",
      "BSD 3-Clause License",
      "Creative Common",
      "GNU GPL v3",
      "The MIT License",
    ]
  },
  {
    message: "Enter contributing note: ",
    name: "contribute"
  },
  {
    message: "Enter test note:",
    name: "test"
  },
  {
    message: "Enter questions:",
    name: "question"
  }
];

function getRepo(username) {
  const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

  axios.get(queryUrl).then(function(res) {
    const repoNames = res.data.map(function(repo) {
      return repo.name;
    });

    const repoNamesStr = repoNames.join("\n");
    console.log(repoNamesStr);

    fs.writeFile("repo.txt", repoNamesStr, function(err) {
      if (err) {
        throw err;
      }

      console.log("Successfully wrote to repo.txt file");
    });

  });
}

function init() {
  inquirer.prompt([
    {
      message: "Enter your github username: ",
      name: "username",
    },
    {
      type: "list",
      message: "What do you want to do ?",
      name: "choice",
      choices: [
        "Create a README file",
        "Generate github profile"
      ]
    }
  ]).then( function(data) {
    // Get user's email, name, avatar
    const queryUrl = `https://api.github.com/users/${data.username}/events/public`;

    axios.get(queryUrl).then(function(res) {
      avatar_url = res.data[1].actor.avatar_url;
      email = res.data[1].payload.commits[0].author.email;
      name = res.data[1].payload.commits[0].author.name;
    });
    if (data.choice === "Create a README file")
      generateReadme();
    else
      getRepo(data.username);
  });
}

async function generateReadme() {
  try {
    console.log("Let's make a README file !\n");
    const answers = await inquirer.prompt(questions);
    /*
    // Get github's info by API
    const { data } = await axios.get(`https://api.github.com/users/${answers.username}/events/public`);
    const avatar_url = data[1].actor.avatar_url;
    const email = data[1].payload.commits[0].author.email;
    const name = data[1].payload.commits[0].author.name;
    */

    switch (answers.license) {
      case "Apache 2.0 License":
        answers.license = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
        break;
      case "BSD 3-Clause License":
        answers.license = "[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)";
        break;
      case "Creative Common":
        answers.license = "[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)";
        break;
      case "GNU GPL v3":
        answers.license = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
        break;
      case "The MIT License":
        answers.license = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    };

    const readme =
`# ${answers.title}

## Description
${answers.description}

## Table of Contents
${answers.toc}

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
${answers.license}

## Contributing
${answers.contribute}

## Tests
${answers.test}

## Questions
${answers.question}`;

  //  await writeFileAsync(
  //    "README.md",readme
  //  );
  } catch (err) {
    console.log(err);
  }
}

/*

function writeToFile(fileName, data) {
}

*/
