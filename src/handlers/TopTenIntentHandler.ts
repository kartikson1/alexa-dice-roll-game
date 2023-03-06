import * as Alexa from "ask-sdk";
import { isIntent } from "../isIntent";
import * as Constants from "../constants";

export const TopTenIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "TopTenIntent"
    );
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    let speechText = "The top 10 high scores are: ";

    if (
      !sessionAttributes.highScoreList ||
      sessionAttributes.highScoreList.length === 0
    ) {
      speechText = "There are no high scores yet.";
    } else {
      for (let i = 0; i < sessionAttributes.highScoreList.length; i++) {
        speechText += `${i + 1}: ${
          sessionAttributes.highScoreList[i].name
        } with a score of ${sessionAttributes.highScoreList[i].score}. `;
      }
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(
        "Do you want to start a new game or listen to the top 10 high scores?"
      )
      .getResponse();
  },
};
