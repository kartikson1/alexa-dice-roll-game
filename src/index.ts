import * as Alexa from "ask-sdk";
import AWS from "aws-sdk";
import { escapeXmlCharacters } from "ask-sdk";
import { isIntent } from "./isIntent";

//Handlers
import { StartGameIntentHandler } from "./handlers/StartGameIntentHandler";
import { TopTenIntentHandler } from "./handlers/TopTenIntentHandler";
import { RollDiceIntentHandler } from "./handlers/RollDiceIntentHandler";
import { ContinueGameIntentHandler } from "./handlers/ContinueGameIntentHandler";
import { DiscontinueGameIntentHandler } from "./handlers/DiscontinueGameIntentHandler";
import { AddNameIntentHandler } from "./handlers/AddNameIntentHandler";
import { FallbackIntentHandler } from "./handlers/FallbackIntentHandler";
import { CommandsHelpIntentHandler } from "./handlers/CommandsHelpIntentHandler";

const CancelOrStopIntentHandler: Alexa.RequestHandler = {
  canHandle: isIntent("AMAZON.CancelIntent", "AMAZON.StopIntent"),
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Goodbye!")
      .withShouldEndSession(true)
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

//Todo RepeatIntentHandler - if a user wants the last response to be repeated
// Todo store last response in sessionAttributes across all handlers
// const RepeatIntentHandler = {
//   canHandle(handlerInput) {
//     return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//       && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent';
//   },
//   handle(handlerInput) {
//     const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
//     const lastResponse = sessionAttributes.lastResponse;

//     return handlerInput.responseBuilder
//       .speak(lastResponse.outputSpeech.ssml)
//       .reprompt(lastResponse.reprompt.outputSpeech.ssml)
//       .getResponse();
//   },
// };

export const handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    CancelOrStopIntentHandler,
    HelloIntentHandler,
    StartGameIntentHandler,
    TopTenIntentHandler,
    RollDiceIntentHandler,
    ContinueGameIntentHandler,
    DiscontinueGameIntentHandler,
    AddNameIntentHandler,
    FallbackIntentHandler,
    CommandsHelpIntentHandler
  )
  .addErrorHandler(() => true, ErrorHandler)
  .lambda();
