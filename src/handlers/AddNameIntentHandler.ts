import * as Alexa from "ask-sdk";
import * as Constants from "../constants";
import { v4 as uuidv4 } from "uuid";
import { dynamodb } from "../db";
import { FallbackHandler } from "./FallBackHandler";

export const AddNameIntentHandler: Alexa.RequestHandler = {
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

    if (addName && addName.match(/^(yes|yeah|yup|sure|okay|ok|absolutely)$/i)) {
      const score = sessionAttributes.score;
      const newHighScoreID = uuidv4();

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
        speechText = Constants.ERROR_MESSAGE;
      }

      // Reset sessionAttributes as game has ended
      sessionAttributes.score = 0;
      sessionAttributes.isGameInProgress = false;

      return handlerInput.responseBuilder.speak(speechText).getResponse();
    } else if (addName && addName.match(/^(no|nope|nah|dont|don't|noo)$/i)) {
      const speechText =
        Constants.SCORE_NOT_ADDED_MESSAGE + Constants.END_GAME_MESSAGE;
      return handlerInput.responseBuilder.speak(speechText).getResponse();
    } else return FallbackHandler.handle(handlerInput);
  },
};
