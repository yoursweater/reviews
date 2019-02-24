const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();

module.exports.run = async (event) => {

    const data = JSON.parse(event.body);
    // const data = event.body

    console.log(data)

    let category = data.category
    let draggedRev = data.draggedRev
    let targetRev = data.targetRev

    console.log(category)
    console.log(draggedRev)
    let tmpDrag = Object.assign({}, data.draggedRev)
    let tmpIdx = tmpDrag.topfive

    if (category == 'topfive') {

        var params = {
            TableName: 'restaurantreviews',
            Key:{
                "id": draggedRev.id
            },
            UpdateExpression: "SET topfive = :attrValue",
            ExpressionAttributeValues:{
                ":attrValue": targetRev.topfive
            }
        }
        console.log("Updating the item...");
        await client.update(params).promise();

        var newparams = {
            TableName: 'restaurantreviews',
            Key: {
                "id": targetRev.id
            },
            UpdateExpression: "SET topfive = :attrValue",
            ExpressionAttributeValues: {
                ":attrValue": tmpIdx
            }
        }
        await client.update(newparams).promise();
    }

    return {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": "false" },
        "multiValueHeaders": {"Access-Control-Allow-Headers": ["Content-Type,X-Amz-Date", "Authorization,X-Api-Key", "X-Amz-Security-Token"] },
        "body": JSON.stringify({"message": "success"})
    }
  };