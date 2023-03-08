import * as Alexa from "ask-sdk";
import { dynamodb } from "../db";
import * as Constants from "../constants";

export const TopTenIntentHandler: Alexa.RequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "TopTenIntent"
    );
  },
  async handle(handlerInput) {
    let speechText = Constants.HIGH_SCORES_MESSAGE;

    try {
      const params = {
        TableName: "HighScores",
      };
      const result = await dynamodb.scan(params).promise();

      if (result.Items.length === 0) {
        speechText = Constants.NO_HIGH_SCORES_MESSAGE;
      } else {
        const sortedItems = result.Items.sort((a, b) => b.score - a.score);
        const topTenSortedItems = sortedItems.slice(0, 10);
        for (let i = 0; i < topTenSortedItems.length; i++) {
          speechText += `${i + 1}: ${topTenSortedItems[i].name}
          with a score of ${topTenSortedItems[i].score}. `;
        }
      }
    } catch (error) {
      console.log(`Error fetching high scores: ${error.message}`);
      speechText = Constants.ERROR_MESSAGE;
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(Constants.ERROR_MESSAGE)
      .getResponse();
  },
};
