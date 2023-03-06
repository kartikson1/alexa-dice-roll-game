import * as Alexa from "ask-sdk";
import { escapeXmlCharacters } from "ask-sdk";
import { isIntent } from "./isIntent";
import { KartiksRollDiceIntentHandler } from "./handlers/KartiksRollDiceIntentHandler";
import { StartGameIntentHandler } from "./handlers/StartGameIntentHandler";
import { TopTenIntentHandler } from "./handlers/TopTenIntentHandler";
import { RollDiceIntentHandler } from "./handlers/RollDiceIntentHandler";
import { ContinueGameIntentHandler } from "./handlers/ContinueGameIntentHandler";
import { EndGameIntentHandler } from "./handlers/EndGameIntentHandler";
import { AddNameIntentHandler } from "./handlers/AddNameIntentHandler";

const CancelOrStopIntentHandler: Alexa.RequestHandler = {
  canHandle: isIntent("AMAZON.CancelIntent", "AMAZON.StopIntent"),
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Goodbye!")
      .withShouldEndSession(true)
      .getResponse();
  },
};

const HelpIntentHandler: Alexa.RequestHandler = {
  canHandle: isIntent("AMAZON.HelpIntent"),
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Try saying hello!")
      .getResponse();
  },
};

const HelloIntentHandler: Alexa.RequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest" ||
      isIntent("HelloWorldIntent")(handlerInput)
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Hello!")
      .withShouldEndSession(true)
      .getResponse();
  },
};

function ErrorHandler(handlerInput: Alexa.HandlerInput, error: Error) {
  return handlerInput.responseBuilder
    .speak(
      ` <amazon:emotion name="excited" intensity="high">
          Abort mission, repeating, abort mission!
        </amazon:emotion>
        <sub alias=",">${escapeXmlCharacters(error.message)}</sub>`
    )
    .withShouldEndSession(true)
    .getResponse();
}

export const handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    CancelOrStopIntentHandler,
    HelpIntentHandler,
    HelloIntentHandler,
    KartiksRollDiceIntentHandler,
    StartGameIntentHandler,
    TopTenIntentHandler,
    RollDiceIntentHandler,
    ContinueGameIntentHandler,
    EndGameIntentHandler,
    AddNameIntentHandler
  )
  .addErrorHandler(() => true, ErrorHandler)
  .lambda();
