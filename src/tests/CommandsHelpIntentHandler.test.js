import { CommandsHelpIntentHandler } from "../handlers/CommandsHelpIntentHandler";
import * as Constants from "../constants";

describe("CommandsHelpIntentHandler", () => {
  it("should return a response with speech and reprompt output", () => {
    const requestEnvelope = {
      request: {
        type: "IntentRequest",
        requestId: "testRequestId",
        intent: {
          name: "CustomHelpIntent",
          confirmationStatus: "NONE",
        },
        dialogState: "COMPLETED",
      },
    };

    const handlerInput = {
      requestEnvelope,
      responseBuilder: {
        speak: jest.fn().mockReturnThis(),
        reprompt: jest.fn().mockReturnThis(),
        getResponse: jest.fn(),
      },
    };

    CommandsHelpIntentHandler.handle(handlerInput);

    expect(handlerInput.responseBuilder.speak).toHaveBeenCalledWith(
      Constants.HELP_COMMANDS_MESSAGE
    );
    expect(handlerInput.responseBuilder.reprompt).toHaveBeenCalledWith(
      Constants.FALLBACK_REPROMPT
    );
  });
});
