"use strict";
const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');

const updateTodo = async (event) => {
    const dynamo = new AWS.DynamoDB.DocumentClient();

    const { id } = event.pathParameters;
    const { completed } = event.body;

    try {
        const todo = (await dynamo.update({
            TableName: 'TodoTable',
            Key: { id },
            UpdateExpression: `set completed = :completed`,
            ExpressionAttributeValues: {
                ':completed': completed
            },
            ReturnValues: 'ALL_NEW'
        }).promise()).Item;


        return {
            statusCode: 200,
            body: JSON.stringify(todo)
        };
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error updating the todo' })
        }
    }
};


module.exports = {
  handler: middy(updateTodo).use(httpJsonBodyParser())
}