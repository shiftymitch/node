const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employeesList = [];

// initial prompt questions
function initialQuestions() {
    console.log("Add new Team Member:");
    return inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Name: "
            },
            {
                type: "input",
                name: "id",
                message: "Employee ID: "
            },
            {
                type: "input",
                name: "email",
                message: "Email Address: "
            },
            {
                type: "list",
                name: "role",
                message: "Role: ",
                choices: ["Manager", "Engineer", "Intern"]
            }
        ]);
}

//class specific add-on questions
function managerQuestions() {
    return inquirer.prompt([
        {
            type: "input",
            name: "officeNumber",
            message: "Office Number: "
        }
    ]);
}

function engineerQuestions() {
    return inquirer.prompt([
        {
            type: "input",
            name: "github",
            message: "Github Username: "
        }
    ]);
}

function internQuestions() {
    return inquirer.prompt([
        {
            type: "input",
            name: "school",
            message: "School: "
        }
    ]);
}

//add member inquiry
function addMember() {
    return inquirer.prompt([
        {
            type: "list",
            name: "addMember",
            message: "Would you like to add a new member?",
            choices: ["Yes", "No"]
        }
    ]);
}

function newTeamMember() {
    initialQuestions()
        .then(function(answer1) {
            const name = answer1.name;
            const id = answer1.id;
            const email = answer1.email;
            //role switcher
            switch(answer1.role) {
                //manager case
                case "Manager":
                    managerQuestions()
                        .then(function(answer2){
                            let manager = new Manager(name, id, email, answer2.officeNumber);
                            employeesList.push(manager);
                            askToAddMember();
                        });
                    break;

                //engineer case
                case "Engineer":
                    engineerQuestions()
                        .then(function(answer2){
                            let engineer = new Engineer(name, id, email, answer2.github);
                            employeesList.push(engineer);
                            askToAddMember();
                        });
                    break;

                //intern case
                case "Intern":
                    internQuestions()
                        .then(function(answer2){
                            let intern = new Intern(name, id, email, answer2.school);
                            employeesList.push(intern);
                            askToAddMember();
                        });
                    break;
            }
        })
        .catch(function(err){
            console.log(err);
        });
}

function askToAddMember() {
    addMember()
            .then(function(answer){
                if (answer.addMember === "Yes") {
                    newTeamMember();
                } else if (answer.addMember === "No" && employeesList !== null) {
                    fs.writeFileSync("../Output/myTeam.html", render(employeesList));
                }
                else console.log("App closed. Run 'node app.js' again to restart the program.")
            });
}

function launch() {
    console.log("Welcome to Team Builder!")
    askToAddMember();
}

launch();





// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
