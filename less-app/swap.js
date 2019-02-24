const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();

module.exports.run = async (event) => {

    // const data = JSON.parse(event.body);
    // const data = event.body

    console.log(event)

    let category = event.category
    let draggedRev = event.draggedRev
    let targetRev = event.targetRev

    let tmpDrag = Object.assign({}, event.draggedRev)

    if (category == 'topfive') {

        var params = {
            TableName: 'restaurantreviews',
            Key:{
                "id": draggedRev.id
            },
            UpdateExpression: "SET topfive = :attrValue",
            ExpressionAttributeValues:{
                ":attrValue": "10"
            }
        }
        
        
        console.log("Updating the item...");
        await client.update(params).promise();

    }

    return {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": "false" },
        "multiValueHeaders": {"Access-Control-Allow-Headers": ["Content-Type,X-Amz-Date", "Authorization,X-Api-Key", "X-Amz-Security-Token"] },
        "body": JSON.stringify({"message": "success"})
    }
  };