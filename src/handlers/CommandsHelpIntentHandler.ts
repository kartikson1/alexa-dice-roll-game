import * as Alexa from "ask-sdk";
import * as Constants from "../constants";

export const CommandsHelpIntentHandler: Alexa.RequestHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      (handlerInput.requestEnvelope.request.intent.name ===
        "CustomHelpIntent" ||
        handlerInput.requestEnvelope.request.intent.name ===
          "AMAZON.HelpIntent")
    );
  },
  handle(handlerInput) {
    const speechOutput = Constants.HELP_COMMANDS_MESSAGE;
    const repromptOutput = Constants.FALLBACK_REPROMPT;

    const response = handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();

    return response;
  },
};
