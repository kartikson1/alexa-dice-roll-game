import * as Alexa from "ask-sdk";
import { isIntent } from "../isIntent";
import * as Constants from "../constants";

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
      const highScores = sessionAttributes.highScoreList || [];
      const score = sessionAttributes.score;

      // Add new high score to the list
      highScores.push({
        name,
        score,
      });

      // Sort the high scores list in descending order
      highScores.sort((a, b) => b.score - a.score);

      // Truncate the list to 10 elements
      const topTenHighScores = highScores.slice(0, 10);

      // Save high scores in sessionAttributes
      sessionAttributes.highScores = topTenHighScores;

      // Reset sessionAttributes as game has ended
      sessionAttributes.score = 0;
      sessionAttributes.isGameInProgress = false;

      const speechText = `Congratulations, ${name}. Your score has been added to the high score list. ${Constants.END_GAME_MESSAGE}`;
      return handlerInput.responseBuilder.speak(speechText).getResponse();
    } else {
      const speechText =
        "Ok, your score was not added to the high score list. " +
        Constants.END_GAME_MESSAGE;
      return handlerInput.responseBuilder.speak(speechText).getResponse();
    }
  },
};
