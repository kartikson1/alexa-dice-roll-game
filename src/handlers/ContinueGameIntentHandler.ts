import * as Alexa from "ask-sdk";
import { isIntent } from "../isIntent";
import * as Constants from "../constants";
import { RollDiceIntentHandler } from "./RollDiceIntentHandler";
import { EndGameIntentHandler } from "./EndGameIntentHandler";

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
    else return EndGameIntentHandler.handle(handlerInput);
  },
};
