const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();

module.exports.run = async (event) => {
    console.log(event)
    const data = JSON.parse(event.body);
    console.log(data)
    const params = {
        TableName: data.table,
        Key:{
            "id": data.id
        },
        UpdateExpression: "set #name = :name",
        ExpressionAttributeNames:{
            "#name": "name"
        },
        ExpressionAttributeValues:{
            ":name": data.order
        },
        ReturnValues:"UPDATED_NEW"
    };

    await client.update(params).promise();
    return {
      "isBase64Encoded": false,
      "statusCode": 200,
      "headers": { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": "true" },
      "multiValueHeaders": {"Access-Control-Allow-Headers": ["Content-Type,X-Amz-Date", "Authorization,X-Api-Key", "X-Amz-Security-Token"] },
      "body": JSON.stringify({"message": "success"})
  }
  };