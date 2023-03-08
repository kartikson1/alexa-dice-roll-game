import * as Alexa from "ask-sdk";
import { isIntent } from "../isIntent";
import * as Constants from "../constants";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

export const AddNameIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AddNameIntent"
    );
  },
  async handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const addName = Alexa.getSlotValue(handlerInput.requestEnvelope, "addName");
    const name = Alexa.getSlotValue(handlerInput.requestEnvelope, "name");

    if (addName && addName == "yes") {
      // Retrieve high scores from sessionAttributes
      const score = sessionAttributes.score;
      const newHighScoreID = uuidv4();

      // const putParams = {
      //   TableName: "HighScores",
      //   Item: {
      //     highScoreID: newHighScoreID,
      //     name,
      //     score,
      //   },
      // };

      // const putParams = {
      //   TableName: "HighScores",
      //   Key: {
      //     id: "highscores",
      //   },
      //   UpdateExpression:
      //     "SET #scores = list_append(#scores, :newHighScore), #numScores = #numScores + :increment",
      //   ExpressionAttributeNames: {
      //     "#scores": "scores",
      //     "#numScores": "numScores",
      //   },
      //   ExpressionAttributeValues: {
      //     ":newHighScore": [
      //       {
      //         highScoreID: newHighScoreID,
      //         name: name,
      //         score: score,
      //       },
      //     ],
      //     ":increment": 1,
      //   },
      // };

      const putParams = {
        TableName: "HighScores",
        Key: {
          highScoreID: newHighScoreID,
        },
        UpdateExpression: "SET #name = :name, #score = :score",
        ExpressionAttributeNames: {
          "#name": "name",
          "#score": "score",
        },
        ExpressionAttributeValues: {
          ":name": name,
          ":score": score,
        },
      };

      let speechText;

      try {
        await dynamodb.update(putParams).promise();
        speechText = `Congratulations, ${name}. Your score has been added to the high score list. ${Constants.END_GAME_MESSAGE}`;
      } catch (error) {
        console.log(`Error adding high score: ${error.message}`);
        speechText = `Error adding high score: ${error.message}`;
      }

      // Reset sessionAttributes as game has ended
      sessionAttributes.score = 0;
      sessionAttributes.isGameInProgress = false;

      return handlerInput.responseBuilder.speak(speechText).getResponse();
    } else {
      const speechText =
        "Ok, your score was not added to the high score list. " +
        Constants.END_GAME_MESSAGE;
      return handlerInput.responseBuilder.speak(speechText).getResponse();
    }
  },
};
