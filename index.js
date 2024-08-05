const fs = require('fs');
const inquirer = require('inquirer');

// License options with their corresponding badge URLs and license links
const licenses = {
    'MIT': {
        badge: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
        link: 'https://opensource.org/licenses/MIT'
    },
    'GPLv3': {
        badge: '[![License: GPLv3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
        link: 'https://www.gnu.org/licenses/gpl-3.0'
    },
    'Apache 2.0': {
        badge: '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
        link: 'https://opensource.org/licenses/Apache-2.0'
    },
    'BSD 3-Clause': {
        badge: '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)',
        link: 'https://opensource.org/licenses/BSD-3-Clause'
    },
    'None': {
        badge: '',
        link: ''
    }
};

const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a description of your project:',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Provide installation instructions:',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Provide usage information:',
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Provide contribution guidelines:',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Provide test instructions:',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your project:',
        choices: Object.keys(licenses),
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
    }
];

function generateReadme(answers) {
    const license = licenses[answers.license];
    return `
# ${answers.title}

${license.badge}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
This project is licensed under the [${answers.license}](${license.link}) license.

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
If you have any questions, you can find me on GitHub: [${answers.github}](https://github.com/${answers.github}) or email me at ${answers.email}.
    `;
}

inquirer.prompt(questions).then((answers) => {
    const readmeContent = generateReadme(answers);
    fs.writeFile('README.md', readmeContent, (err) => {
        err ? console.log(err) : console.log('README.md has been generated!')
    });
});

