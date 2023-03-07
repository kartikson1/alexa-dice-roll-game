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

    console.log("HEREEEEE!");
    console.log(continueGame);

    if (continueGame && continueGame.includes("no"))
      return EndGameIntentHandler.handle(handlerInput);
    else return RollDiceIntentHandler.handle(handlerInput);
  },
};
