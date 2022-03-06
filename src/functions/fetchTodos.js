"use strict";
const AWS = require('aws-sdk');

const fetchTodos = async (event) => {

    const dynamo = new AWS.DynamoDB.DocumentClient();

    try {
        const results = (await dynamo.scan({ TableName: 'TodoTable' }).promise()).Items;
        return {
            statusCode: 200,
            body: JSON.stringify(results)
        };
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching the todos' })
        }
    }
};


module.exports = {
  handler: fetchTodos
}