## Important commands

### How to deploy to S3:

When in the reviews directory:

`npm run build`

then 

`aws s3 sync build/ s3://caelar-eats.com --profile daneversen`

### How to update the Lambda functions

Make and save your edits, then in the less-app directory:

`sls deploy`

If there is an error, you can redeploy after using

`sls remove`

### To get the endpoints if not using the API Gateway

`sls info`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

