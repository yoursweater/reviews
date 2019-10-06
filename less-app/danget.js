const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();
const uuid = require("uuid/v4");

module.exports.run = async (event) => {

    const params = {
        TableName : 'dantable',
        Limit : 200
    };
      
    let response = await client.scan(params).promise();
    let res = JSON.stringify(response)
    return {
      "isBase64Encoded": false,
      "statusCode": 200,
      "headers": { "Access-Control-Allow-Origin": "*" },
      "multiValueHeaders": {"Access-Control-Allow-Headers": ["Content-Type,X-Amz-Date", "Authorization,X-Api-Key", "X-Amz-Security-Token"] },
      "body": res
  }
  };