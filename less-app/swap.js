const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();

module.exports.run = async (event) => {

    let category = event.category
    let draggedRev = event.draggedRev
    let targetRev = event.targetRev

    let tmpDrag = Object.assign({}, draggedRev)

    if (category == 'topfive') {

        var params = {
            TableName: 'restaurantreviews',
            Key:{
                "id": draggedRev.id
            },
            UpdateExpression: "SET #attrName = :attrValue",
            ExpressionAttributeNames: {
                "#attrName" : "topfive"
            },
            ExpressionAttributeValues:{
                ":attrValue": {
                    "S": (parseInt(targetRev.topfive) + 5).toString()
                } 
            }
        };
        
        console.log("Updating the item...");
    //    await client.update(params, function(err, data) {
    //         if (err) {
    //             console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    //         } else {
    //             console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    //         }
    //     })

        await client.update(params).promise();

    }

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