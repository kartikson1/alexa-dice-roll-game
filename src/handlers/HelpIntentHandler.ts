import * as Constants from "../constants";

export const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    const speechText = Constants.HELP_COMMANDS;

    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};
