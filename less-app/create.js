const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();
const uuid = require("uuid/v4");

module.exports.run = async (event) => {
    const data = JSON.parse(event.body);
    const params = {
      TableName: "reviews",
      Item: {
        id: uuid(),
        name: data.name,
        stars: data.stars,
        topfive: data.topfive,
        description: data.description,
        cuisine: data.cuisine,
        price: data.price,
        location: data.location
      }
    };
    await client.put(params).promise();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin':'*' ,
        "Access-Control-Allow-Headers":'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
      },
      body: JSON.stringify(data)
    };
  };