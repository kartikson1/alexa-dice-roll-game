import * as Constants from "../constants";
import * as Alexa from "ask-sdk";

export const FallbackIntentHandler: Alexa.RequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" &&
      request.intent.name === "AMAZON.FallbackIntent"
    );
  },
  handle(handlerInput) {
    const speechOutput = Constants.FALLBACK_MESSAGE;
    const repromptOutput = Constants.FALLBACK_REPROMPT;

    const response = handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();

    return response;
  },
};
