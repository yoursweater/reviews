const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();
const uuid = require("uuid/v4");

module.exports.run = async (event) => {
  console.log(event)
    const data = JSON.parse(event.body);
    // const data = event 
    console.log(data)
    const params = {
      TableName: "maytable",
      Item: {
        id: uuid(),
        name: data.name,
        rank: data.rank
      }
    };
    await client.put(params).promise();
    return {
      "isBase64Encoded": false,
      "statusCode": 200,
      "headers": { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": "false" },
      "multiValueHeaders": {"Access-Control-Allow-Headers": ["Content-Type,X-Amz-Date", "Authorization,X-Api-Key", "X-Amz-Security-Token"] },
      "body": JSON.stringify({"message": "success"})
  }
  };