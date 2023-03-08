import * as Alexa from "ask-sdk";
import { RollDiceIntentHandler } from "./RollDiceIntentHandler";
import { DiscontinueGameIntentHandler } from "./DiscontinueGameIntentHandler";

export const ContinueGameIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "ContinueGameIntent"
    );
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const continueGame = Alexa.getSlotValue(
      handlerInput.requestEnvelope,
      "continueGame"
    );

    console.log(continueGame);

    if (continueGame && continueGame == "yes")
      return RollDiceIntentHandler.handle(handlerInput);
    else return DiscontinueGameIntentHandler.handle(handlerInput);
  },
};
