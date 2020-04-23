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
        }
    ]);
}

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
Here is how you contribute to this project.

## Tests
Some test instructions go here.

## Questions
Questions can be directed via email to [shiftymitch@gmail.com]("mailto:shiftymitch@gmail.com")

    `;
    // ## Badges
    
    // ![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)
    
    
    // ## Contributing
    
    // If you created an application or package and would like other developers to contribute it, you will want to add guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own.
    
    // ## Tests
    
    // Go the extra mile and write tests for your application. Then provide examples on how to run them.
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