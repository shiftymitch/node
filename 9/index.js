// require
const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");

// promisify funcitons
const appendFileAsync = util.promisify(fs.appendFile);
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

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
    ])
}

function generateReadme(answers) {
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
    *Collaborators
        *${answers.collaborators}
        *${answers.github}
    
    *Other Attributions
        *${answers.attributions} 
    
    
    ## License
    
    The last section of a good README is a license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, use [https://choosealicense.com/](https://choosealicense.com/)
    
    
    ---
    
    🏆 The sections listed above are the minimum for a good README, but your project will ultimately determine the content of this document. You might also want to consider adding the following sections.
    
    ## Badges
    
    ![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)
    
    Badges aren't _necessary_, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.
    
    
    ## Contributing
    
    If you created an application or package and would like other developers to contribute it, you will want to add guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own.
    
    ## Tests
    
    Go the extra mile and write tests for your application. Then provide examples on how to run them.
    `;
}