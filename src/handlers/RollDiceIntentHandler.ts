import * as Alexa from "ask-sdk";
import { isIntent } from "../isIntent";
import * as Constants from "../constants";

export const RollDiceIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "RollDiceIntent"
    );
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    sessionAttributes.isGameInProgress = true;
    const roll = Math.floor(Math.random() * 6) + 1;
    let speechText;
    if (roll === 1) {
      sessionAttributes.score = 0;
      speechText = Constants.ROLL_ONE_MESSAGE;
    } else {
      if (sessionAttributes.score) sessionAttributes.score += roll;
      else sessionAttributes.score = roll;
      speechText = `You rolled a ${roll}. Your score is now ${sessionAttributes.score}. Do you want to continue the game?`;
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withShouldEndSession(false)
      .getResponse();
  },
};
