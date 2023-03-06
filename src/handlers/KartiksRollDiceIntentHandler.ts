import * as Alexa from "ask-sdk";
import { isIntent } from "../isIntent";

export const KartiksRollDiceIntentHandler: Alexa.RequestHandler = {
  canHandle: isIntent("KartiksRollDiceIntent"),
  handle(handlerInput) {
    const roll = Math.floor(Math.random() * 6) + 1;
    const speechText = `Kartik says you rolled a ${roll}.`;
    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};
