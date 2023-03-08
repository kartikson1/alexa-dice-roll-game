import * as Alexa from "ask-sdk";
import * as Constants from "../constants";

export const DiscontinueGameIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "DiscontinueGameIntent"
    );
  },
  handle(handlerInput) {
    const promptText = Constants.ADD_SCORE_MESSAGE;

    return handlerInput.responseBuilder
      .speak(`${promptText}`)
      .withShouldEndSession(false)
      .getResponse();
  },
};
