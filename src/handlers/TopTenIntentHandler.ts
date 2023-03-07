import * as Alexa from "ask-sdk";
import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

export const TopTenIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "TopTenIntent"
    );
  },
  async handle(handlerInput) {
    let speechText = "The top high scores are: ";

    try {
      const params = {
        TableName: "HighScores",
      };
      const result = await dynamodb.scan(params).promise();

      if (result.Items.length === 0) {
        speechText = "There are no high scores yet.";
      } else {
        const sortedItems = result.Items.sort((a, b) => b.score - a.score);
        for (let i = 0; i < sortedItems.length; i++) {
          speechText += `${i + 1}: ${sortedItems[i].name} with a score of ${
            sortedItems[i].score
          }. `;
        }
      }
    } catch (error) {
      console.log(`Error fetching high scores: ${error.message}`);
      speechText = "There was an error fetching the high scores.";
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(
        "Do you want to start a new game or listen to the top high scores?"
      )
      .getResponse();
  },
};
