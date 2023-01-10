# Frontend tech task

This task should be solved using React, and preferably with TypeScript. Try to keep best practices, performance and
clean code in mind when you solve this task. Upload the task to Github/Gitlab/Bitbucket or something equivalent once you
are done.

You are allowed to use third-party libraries, but keep in mind that the solution should showcase your own abilities. A
styling library, design system or data fetching library is fine, but you should avoid using something like a table
library that handles all of the list logic for you.
The task

The following endpoint returns a JSON response with a list of articles:
https://storage.googleapis.com/aller-structure-task/article_list.json
Create a React app that fetches the data from that endpoint and displays the articles in a list. The list should display
10 articles at a time and there should be a navigation there that allows us to show the next 10 or the previous 10
articles.

Each article in the list should have an "edit"-button and a "delete"-button. The "edit"-button should allow us to edit
the title of the article and the "delete"-button should delete the article. As a bonus task, you can implement some kind
of client side logic to persist the changes across reloads using localStorage.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right
into your project so you have full control over them. All of the commands except `eject` will still work, but they will
point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

## Learn More

You can learn more in
the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
