import * as Alexa from "ask-sdk";
import { isIntent } from "../isIntent";
import * as Constants from "../constants";

export const EndGameIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "EndGameIntent"
    );
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    sessionAttributes.isGameInProgress = false;
    sessionAttributes.score = 0;

    const speechText = Constants.END_GAME_MESSAGE;
    const promptText = Constants.ADD_SCORE_MESSAGE;
    // const repromptText = "Please say yes or no.";

    return (
      handlerInput.responseBuilder
        .speak(`${speechText} ${promptText}`)
        // .reprompt(repromptText)
        .addElicitSlotDirective("AddNameSlot", {
          name: "AddNameSlot",
          confirmationStatus: "NONE",
        })
        .getResponse()
    );
  },
};
