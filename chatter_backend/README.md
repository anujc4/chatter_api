# Chatter API

A simple chat app built using node.js and express.js

## Getting Started

Simple clone this repository and checkout to `1.0.0_Getting_Started` branch. To do so, follow the given steps
```
git clone https://github.com/anujc4/chatter_api.git
cd chatter_api
git checkout 1.0.0_Getting_Started
```

### Prerequisites

This project is built using MacOS. Although the steps should be the same for Windows or any other Unix environment, I would recommend all learners to use a Unix based OS to work on this project.

We will first need to have node installed on your system. You can install node via [official website](https://nodejs.org/en/) or via terminal based on the environment you may be using.
On Unix based systems, you can easily install [NVM(Node Version Manager)](https://github.com/creationix/nvm) by running the below command on your terminal.

```curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash```

Once nvm is installed, copy the below snippet in your bash profile

```
export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

Simply refresh your terminal and verify if nvm is installed on your system by typing `nvm -v` on your terminal. Once nvm is verified, install node by running `nvm install 8.10` and Voila! Your'e done.

Alternatively, if you don't want to use nvm, you can run the command below based on your environment.
* Mac: Install [Homebrew](https://brew.sh/) and run `brew install node`
* Windows: Install [chocolatey](https://chocolatey.org/) and run `choco install node`
* Ubuntu: `sudo apt update && sudo apt install nodejs npm`
* Fedora: `yum install -y gcc-c++ make`<br/>
    `curl -sL https://rpm.nodesource.com/setup_11.x | sudo -E bash -`<br/>
    `yum install nodejs`

### Installing

Once you confirm that node js is installed on your system, install the project dependencies by running `npm i`. This command will look for your package.json file and install all your dependencies.


### Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [mongoose](https://mongoosejs.com/docs/guide.html) - The ODM library for talking to MongoDB

## Authors

Anuj Chandra<br/>
Built for BoardInfinity.