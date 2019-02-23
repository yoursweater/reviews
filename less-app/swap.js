const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();

module.exports.run = async (event) => {
    console.log(event)
    // console.log(event.id)
    // const id = JSON.parse(event.id);
    let id = event.body
    console.log(id)
    // console.log(id)
    // const params = {
    //     TableName: "reviews",
    //     Key:{
    //         "id": id
    //     }
    // };

    // await client.put(params).promise();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers': 'Content-Type,x-requested-with,Access-Control-Allow-Origin,Access-Control-Allow-Headers,Access-Control-Allow-Methods',
        'Access-Control-Allow-Methods': 'PUT'
      },
      body: JSON.stringify(event)
    };
  };