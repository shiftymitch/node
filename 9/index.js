// require
const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");

// promisify funciton
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

// get user input
function promptUser() {
    console.log("Please answer the following to populate your README.md file:")
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Project Name: "
        },
        {
            type: "input",
            name: "description",
            message: "Description of the project: "
        },
        {
            type: "input",
            name: "installation",
            message: "Installation instructions: "
        },
        {
            type: "input",
            name: "howTo",
            message: "Describe how to use the application: "
        },
        {
            type: "input",
            name: "collaborators",
            message: "Who contributed to the project?: "
        },
        {
            type: "input",
            name: "github",
            message: "Link to their Github: "
        },
        {
            type: "input",
            name: "attributions",
            message: "Add more attributions: "
        },
        {
            type: "input",
            name: "license",
            message: "License type: "
        },
        {
            type: "input",
            name: "contribute",
            message: "How to contribute to this project: "
        },
        {
            type: "input",
            name: "test",
            message: "How to run a test: "
        },
        {
            type: "input",
            name: "email",
            message: "Email address to direct questions to: "
        }
    ]);
}

//create README file
function generateREADME(answers) {
    return `
# ${answers.title}

## Description 
${answers.description}

## Table of Contents    
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)


## Installation
${answers.installation}

## Usage 
${answers.howTo}


## Credits
* Collaborators
    * ${answers.collaborators}
    * ${answers.github}

* Other Attributions
    * ${answers.attributions} 

## License
${answers.license} 

## Contributing
${answers.contribute} 

## Tests
${answers.test}

## Questions
Questions can be directed via email to ${answers.email}

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

    `;
}

//write file
promptUser()
    .then(function (answers) {
        const readMe = generateREADME(answers);
        return writeFileAsync("README.md", readMe);
    })
    .then(function () {
        console.log("Successfully wrote to README.md");
    })
    .catch(function (err) {
        console.log(err);
    });