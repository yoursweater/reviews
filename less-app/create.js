const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();
const uuid = require("uuid/v4");

module.exports.run = async (event) => {
  console.log(event)
    const data = JSON.parse(event.body);
    // const data = event 
    console.log(data)
    const params = {
      TableName: "restaurantreviews",
      Item: {
        id: data.id ? data.id : uuid(),
        name: data.name,
        stars: data.stars,
        topfive: data.topfive,
        maytopfive: data.maytopfive,
        wallofshame: data.wallofshame,
        description: data.description,
        cuisine: data.cuisine,
        price: data.price,
        location: data.location
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