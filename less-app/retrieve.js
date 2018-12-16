const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();
const uuid = require("uuid/v4");

module.exports.run = async (event) => {

    const params = {
        TableName : 'reviews',
        Limit : 200
    };
      
    let response = await client.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    };
  };