"use strict";
const AWS = require('aws-sdk');

const fetchTodo = async (event) => {

    const { id } = event.pathParameters;

    const dynamo = new AWS.DynamoDB.DocumentClient();

    try {
        const todo = (await dynamo.get({
            TableName: 'TodoTable',
            Key: { id }
        }).promise()).Item;
        return {
            statusCode: 200,
            body: JSON.stringify(todo)
        };
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching the todo' })
        }
    }
};


module.exports = {
  handler: fetchTodo
}