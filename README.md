# Orders-manager
App for managing orders in online store

[![CircleCI](https://circleci.com/gh/DimaDK24/orders-manager/tree/master.svg?style=svg)](https://circleci.com/gh/DimaDK24/orders-manager/tree/master)

## Launching project for contributing

You'll need to have [NodeJS](https://nodejs.org/en/) installed.
Verify it by running `node --version` in the console.
It should show at least 8th version.
If it reports error, please install node with [this link](https://nodejs.org/en/)

I use [yarn (facebook package manager)](https://yarnpkg.com/en/docs/install)
on this and other projects, please install it for comfortable work.
It's nice alternate to npm, really :)

Verify installation by running `yarn --version` in the console.
It should show 1.13 or higher.

Please read yarn's small [usage guide](https://yarnpkg.com/en/docs/usage).
And [here are complete docs to its CLI](https://yarnpkg.com/en/docs/cli).
The best feature of yarn (to me) is that it allows to run package scripts short way:
`yarn lint` instead of `npm run lint` and so on.

Fork this repository with `fork` button in the bottom top corner

Next clone **your new forked** repository.
**Change your-username to your actual github username in the command:**

`git clone https://github.com/your-username/orders-manager.git`

Go to project folder: `cd orders-manager`

Install packages: `yarn install`

We have frontend and backend in the same repo and use
[yarn workspaces](https://yarnpkg.com/en/docs/workspaces) to manage monorepo.
Frontend is located in `packages/frontend`, backend - `packages/backend`.
They are just regular packages.
You only need to run `yarn install` one time in the **root** folder. Yarn sees subpackages
and installs their dependencies and dependencies of root package.
There's no magic, just [yarn workspaces](https://yarnpkg.com/en/docs/workspaces)

## Working with frontend

Frontend is built on [ReactJS](http://reactjs.org/)
and was bootstrapped with [create-react-app](https://create-react-app.dev/).

## Working with backend

Backend is built on [AWS Lambda](https://aws.amazon.com/lambda/)
with help of [serverless framework](https://serverless.com/).
Local launch is handled by [serverless-offline](https://github.com/dherault/serverless-offline/).
Our database is [MongoDB](https://www.mongodb.com/).

In order to launch backend locally you need to create MongoDB database.
You can use [free 500 mb MongoDB Atlas Cluster](https://www.mongodb.com/cloud/atlas)

To launch backend:

- Copy `packages/backend/.env.local.example` to `packages/backend/.env.local`
- In `packages/backend/.env.local` replace fake DB connect url
with your own (get it in MongoDB Atlas or from local MongoDB server)
- Run `yarn start:backend`. I believe you already installed all dependencies :)
- Open [localhost:3001](http://localhost:3001/) to verify, that basic logic works
- Open [localhost:3001/test-db](http://localhost:3001/test-db) to verify,
that functions can connect to database

## Available scripts

All scripts should be run in root folder.

### Frontend

- start:frontend - launches frontend at local dev server with hot reloading (it's hot as hell)
- test:frontend - runs tests, defined in frontend package
- start:storybook - launches [storybook](https://storybook.js.org/)

### Backend

- start:backend - launches backend locally, read "Working with backend" section
- test:backend - runs tests, defined in backend package

### Common (frontend + backend) scripts

- test - tests backend and frontend
- format - reformat all js,jsx,json,css files according to [prettier](https://prettier.io/)
config
- lint:js - runs [eslint](https://eslint.org/) on js and jsx files
- lint:styles - runs [stylelint](https://stylelint.io) on css,sass,scss files
- lint:code - runs lint:js and then lint:styles
- lint:commits - runs [commitlint](https://commitlint.js.org/) on commits in new branch
- lint - runs lint:code and then lint:commits

## Git configuration for end of lines

Isn't as easy as it should be if you work on Windows.
In that case you need to take some additional steps
to ensure you have correct line endings locally.
By default git on windows changes lf line breaks to crlf on checkout.
And our linter reports this as error. So we need to reconfigure git.

Go to the repository. Run:
```
git config --local core.eol lf
git config --local core.autocrlf false
```

This will tell git to use lf line endings
and don't perform any changes to line breaks on checkin or checkout.

Additional information about these settings are available here:
[git docs](https://git-scm.com/docs/git-config#Documentation/git-config.txt-coreautocrlf)
[stackoverflow 1](https://stackoverflow.com/q/9976986/)
[stackoverflow 2](https://stackoverflow.com/q/1249932/)

Now we need to apply this settings to our current working tree. To do it run:
`git rm --cached -r . && git reset --hard`.
This command cleans working tree and then load working tree from repository index.
This applies configs, we set above.
Now run `yarn lint` to ensure that everything works. You shouldn't get any errors.


## Code style

I use [prettier](https://prettier.io/) to format code. Have a look at prettier config file.
You always can run `yarn format` to reformat code according to our guide.
Most times, [eslint](https://eslint.org/) or [stylelint](https://stylelint.io)
will report any code style violation.

## Commit style

I use [conventionallcommits specification](https://www.conventionalcommits.org/en/v1.0.0-beta.4/).
Except one rule: subject line should not exceed 50 characters.
It's required to make github render subject nicely.

## IDE setup

### WebStorm

EditorConfig is supported out of the box.

To reformat code according to prettier configuration right in WebStorm:
1. Type `Ctrl/cmd + ,` to open settings
2. Open `Languages & Frameworks/JavaScript/Prettier`
3. Make sure that `prettier package` fields points to
locally installed prettier package
4. After that you can run prettier on the current file with `Ctrl/cmd + alt/option + shift + P`

To view and fix eslint errors right in WebStorm
1. Type `Ctrl/cmd + ,` to open settings
2. Open `Languages & Frameworks/JavaScript/Code Quality Tools/ESLint`
3. Make sure that `automatic ESLint configuration` is checked
4. After that all js and jsx files will be automatically checked by eslint

To view and fix stylelint errors right in WebStorm:
1. Type `Ctrl/cmd + ,` to open settings
2. Open `Languages & Frameworks/Style Sheets/Stylelint`
3. Check `Enable` checkbox and make sure that `Stylelint package` field points
to locally installed stylelint package
4. After that all style sheets will be automatically checked by stylelint

Configure commit rules and inspections:
1. Type `Ctrl/cmd + ,` to open settings
2. Open `Version Congtrol/Commit Dialog`
3. Check `Force non-empty commit comments`
4. Under commit message inspections choose `error` severity for everything except `Spelling`.
`Spelling`'s severity should be `Typo`
5. Click on `limit body line` and choose **72** as right margin
6. For `limit subject lint` inspection right margin should be **50**,
according to our commit specification
7. Ensure that `Perform code analysis` checkbox in the `Before commit` section is checked.
It will run eslint or stylelint on changed files before commit

### Visual Studio Code

Install [editoconfig plugin](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
to ensure correct configuration related to editorconfig 

Install [eslint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
to view and fix eslint errors right in VS Code 

Install [stylelint plugin](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)
to view and fix stylelint errors right in VS Code 

To prevent both the editor built-in linters (css,scss) and stylelint from reporting same errors,
disable the built-in ones in User or Workspace setting:
```
"css.validate": false,
"scss.validate": false
```

Install [prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
to reformat code according to prettier config right in VS code.

You may also install [spellchecker plugin](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
to ensure your code doesn't contain typos

Also, [GitLens plugin](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
can simplify work with git

Restart VS Code to ensure, that all extensions are correctly installed

To reformat code with prettier click `F1`->`Format document`.
If you're asked about formatter to use, choose prettier.

Configure commit message rules and inspections:

Type `Ctrl/cmd + ,` to open settings

Search for `git.inputValidationLength`
Ensure the value of this option is **72**

Search for `git.inputValidationSubjectLength`
The value of the first option should be **50**, according to our commit specification

If you have any questions, please don't hesitate to contact [me](https://t.me/DimaDK24)
or open an issue.

If you have any suggestions, how this doc can be improved, feel free to contact [me](https://t.me/DimaDK24)
or open PR or issue.

## Git workflow

We use [forking workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow)

Please read article above, if you're new to working with git in a team.

## Code Style

Please read [our code style guide](CODESTYLE.md)
