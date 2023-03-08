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
    const speechText = Constants.END_GAME_MESSAGE;
    const promptText = Constants.ADD_SCORE_MESSAGE;

    return handlerInput.responseBuilder
      .speak(`${speechText} ${promptText}`)
      .withShouldEndSession(false)
      .getResponse();
  },
};
