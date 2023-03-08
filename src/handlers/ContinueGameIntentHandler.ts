import * as Alexa from "ask-sdk";
import { RollDiceIntentHandler } from "./RollDiceIntentHandler";
import { DiscontinueGameIntentHandler } from "./DiscontinueGameIntentHandler";
import { FallbackHandler } from "./FallBackHandler";

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

    if (
      continueGame &&
      continueGame.match(/^(yes|yep|yeah|yup|sure|okay|ok|absolutely)$/i)
    )
      return RollDiceIntentHandler.handle(handlerInput);
    else if (continueGame && continueGame.match(/^(no|nope|nah|don't|)$/i))
      return DiscontinueGameIntentHandler.handle(handlerInput);
    else return FallbackHandler.handle(handlerInput);
  },
};
