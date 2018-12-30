const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();

module.exports.run = async (event) => {
    console.log(event)
    console.log(event.id)
    // const id = JSON.parse(event.id);
    // let data = JSON.parse(event)
    // console.log(data)
    // console.log(id)
    const params = {
        TableName: "reviews",
        Key:{
            "id": event.id        }
    };

    await client.delete(params).promise();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin':'*' ,
        "Access-Control-Allow-Headers":'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
      },
      body: JSON.stringify(event)
    };
  };