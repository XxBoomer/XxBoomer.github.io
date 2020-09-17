// TODO -> GENERATE HTML
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const engineers = [];
const interns = [];
var manager = "";
console.log("Let's put together an engineer team.");
inquirer.prompt([
  {
    type: "input",
    message: "An engineer team MUST have a manager, enter the manager's name:",
    name: "name",
  },
  {
    type: "input",
    message: "Enter manager's ID:",
    name: "id",
  },
  {
    type: "input",
    message: "Enter manager's email:",
    name: "email",
  },
  {
    type: "input",
    message: "Enter manager's officer number:",
    name: "officeNumber",
  }
]).then(function(ans) {
  // Create manager
  manager = new Manager(ans.id, ans.name, ans.email, ans.officeNumber);
  addMember();
});

async function renderHTML() {
  try {
    // Read template
    var manager_template = await readFileAsync("./templates/manager.html","utf8");
    const intern_template = await readFileAsync("./templates/intern.html","utf8");
    const engineer_template = await readFileAsync("./templates/engineer.html","utf8");
    var main = await readFileAsync("./templates/main.html","utf8");
    // Put information of manager into template
    manager_template = manager_template.replace("{{ name }}",manager.name);
    manager_template = manager_template.replace("{{ id }}",manager.id);
    manager_template = manager_template.replace("{{ email }}",manager.email);
    manager_template = manager_template.replace("{{ email }}",manager.email);
    manager_template = manager_template.replace("{{ officeNumber }}",manager.officeNumber);
    manager_template = manager_template.replace("{{ role }}",manager.getRole());

    // Put information of engineers into template
    var templated_engineers = engineers.map(data => {
      var templated = engineer_template.replace("{{ id }}", data.id);
      templated = templated.replace("{{ name }}", data.name);
      templated = templated.replace("{{ email }}", data.email);
      templated = templated.replace("{{ email }}", data.email);
      templated = templated.replace("{{ github }}", data.github);
      templated = templated.replace("{{ github }}", data.github);
      templated = templated.replace("{{ role }}", data.getRole());
      return templated;
    });
    // Put information of interns into template
    var templated_interns = interns.map(data => {
      var templated = intern_template.replace("{{ id }}", data.id);
      templated = templated.replace("{{ name }}", data.name);
      templated = templated.replace("{{ email }}", data.email);
      templated = templated.replace("{{ email }}", data.email);
      templated = templated.replace("{{ school }}", data.school);
      templated = templated.replace("{{ role }}", data.getRole());
      return templated;
    });
    // Put together the whole team
    var team = manager_template;
    templated_engineers.forEach(element => team += element);
    templated_interns.forEach(element => team += element);
    main = main.replace("{{ team }}", team);
    await writeFileAsync("TeamProfile.html", main, "utf8");
  } catch (err) {
    console.log(err);
  }
}

function addMember() {
  inquirer.prompt({
    type: "list",
    message: "Do you want to add more Engineer or Intern into the team ?",
    name: "choice",
    choices: ["Engineer","Intern","No"]
  }).then(function(ans) {
      if (ans.choice === "Engineer") {
        addEngineer();
      }
      else if (ans.choice === "Intern") {
        addIntern();
      }
      else if (ans.choice === "No") {
        renderHTML();
      }
  });
}
function addEngineer() {
  inquirer.prompt([
  {
    type: "input",
    message: "Enter the engineer's name:",
    name: "name",
  },
  {
    type: "input",
    message: "Enter engineer's ID:",
    name: "id",
  },
  {
    type: "input",
    message: "Enter engineer's email:",
    name: "email",
  },
  {
    type: "input",
    message: "Enter engineer github:",
    name: "github",
  }
  ]).then(function(ans) {
    // Add new engineer to the array
    var engineer = new Engineer(ans.id, ans.name, ans.email, ans.github);
    engineers.push(engineer);
    addMember();
  });
}

function addIntern() {
  inquirer.prompt([
  {
    type: "input",
    message: "Enter the intern's name:",
    name: "name",
  },
  {
    type: "input",
    message: "Enter intern's ID:",
    name: "id",
  },
  {
    type: "input",
    message: "Enter intern's email:",
    name: "email",
  },
  {
    type: "input",
    message: "Enter intern's school:",
    name: "school",
  }
  ]).then(function(ans) {
  // Add new intern to the array
  var intern = new Intern(ans.id,ans.name,ans.email,ans.school);
  interns.push(intern);
  addMember();
  });
}
