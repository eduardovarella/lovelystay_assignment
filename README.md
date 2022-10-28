# Lovely Stay - Front End Opportunity Challenge

This repository contains code that implements the front-end developer assignment presented by LovelyStay.

The challenge consists in implementing a simple React JS app to search for Github users and display their information using the Github API.

## How to install
```
git clone https://github.com/eduardovarella/lovelystay_assignment.git

cd lovelystay_assignment

nvm use v16.10

yarn install
```

## How to run the app
```
yarn start
```

## How to run the automated tests
```
yarn test
```

## Implementation considerations and decisions

- Why `nvm use v16`? 

    Somehow I got some conflicts between axios and node, and found the solution using this version with `axios ^0.27.2`.

- GitHub API

    To prevent putting the API KEY on the client, which would be a security issue, I'm using the non-authenticated API. During tests I've reached some call limits, so it `may happen during challenge code evaluation`. In a real life scenario, the communication with GitHub API would be done through and backend where we could securily store the API Key and use the authenticatedd API.

- Routing, App State Management and Error Handling

    As a matter of keeping things simples, I've opted not use any more robust solution for routing and state management (such as React Route and Context API). Also, error handling could be enhanced by better parsing axios erros responses and not using `window.alert` to display messages.

- Testing

    I've use `nock` to mock the GitHub API during tests. Also to "keep it simple" I didn't go through all possible test scenarios. Just wanted to demonstrated mocking and DOM handling.

- `create-react-app` generated code clean-up

    I haven't spend too much time on cleaning-up non-used code/files generated by `create-react-app`.

