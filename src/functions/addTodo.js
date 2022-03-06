"use strict";

const { v4 } = require('uuid');
const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');

const addTodo = async (event) => {
  const dynamo = new AWS.DynamoDB.DocumentClient();

  const { todoText } = event.body;
  const createdAt = Date.now();
  const id = v4();

  const newTodo = {
    id,
    todo: todoText,
    createdAt,
    completed: false
  }

  try {
    const response = await dynamo.put({
      TableName: 'TodoTable',
      Item: newTodo
    }).promise();

    console.log(response);

    return {
      statusCode: 200,
      body: JSON.stringify(newTodo),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify({message: 'error storing the todo'})
    }
  }
};


module.exports = {
  handler: middy(addTodo).use(httpJsonBodyParser())
}