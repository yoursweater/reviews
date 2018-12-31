const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();
const uuid = require("uuid/v4");

module.exports.run = async (event) => {
  console.log(event)
    const data = JSON.parse(event.body);
    console.log(data)
    const params = {
      TableName: "reviews",
      Item: {
        id: uuid(),
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
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin':'*' ,
        "Access-Control-Allow-Headers":'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
      },
      body: JSON.stringify(data)
    };
  };