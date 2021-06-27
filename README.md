# Getting Started with Air Quality React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Components

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Dashboard

This section mainly shows the list of cities along with their air quality intdex values and the quality in absolute terms.
  It represents data in a tabular form , where each row is a city.
  If you click on any of the rows , you will be redirected to details page containing some more info about the quality of air of that city.
  The Show Charts button on top redirects you to a page where you can see comparision of different cities in the form of bar charts.

### City Details

This component contains two graphical representation of a citiy's data. 
  The graph on the left shows the trends of air quality index value for a particualr city. The data is represented in the form of line chart
  Once you open it up, it updates itself continuously with data of last few minutes or hours, it can be configured.
  
  The graph on the right shows the comparision of citiy's aqi value with respect to baest and worst values in the from of a bar chart

### Comaprision Char

This section represents the aqi values of different cities in the form of bar chart.

## CI/CD

## CI

This repo has been integrated with travis CI from builds and heroku for continuos deployment.
  Builds will be triggered for all the PR and bracnhes automatically, But deployment is enabled for only Main branch.
  

### Deployment

  Once a PR is merged to main , if the builds and test cases are successful, it gets deployed to heroku with a docker container stack.

## External Libraries used
  
  ### Graphing
    For graphs I have used Plotly (based on D3.js) as it has vast community support and a generous documentation. Supports different Javascript 
     frameworks like React, Vue, etc. Also its is quite easy to integrate and its open source.


