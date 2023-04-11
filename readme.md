# Dice Voyage: A Playful Game of Chance

### [Click to view the video Demo!](https://youtu.be/Dvtr54TPEJ8)

Welcome to the Voice-Controlled Dice Game on Alexa! This game is a fully functioning demo where you can roll virtual dice and try your luck. Here's how the game works:

- At the start of each session, you can choose to start a new game or listen to the top 10 high scores.
- Roll virtual dice and get a score of 2-6 for each roll.
- If you roll a 1, your score will reset to zero.
- After each roll, the game will ask you if you want to continue or end the game.
- When the game ends, you can choose to add your name to the high score list.

## How to Play

Open the Alexa app on your device.
Enable the "Dice Game" skill.
Say "Alexa, open volley skill and turn on the game" to start a new game.
Follow the instructions provided by Alexa to roll the dice, continue or end the game, and add your name to the high score list.

The sample sequence below should give you a better idea of how a gameplay can look like:

## Sample sequence

User: "Alexa, open volley skill and turn on the game"
<br/>
Alexa: "Welcome to Volley's Dice Game! Do you want to start a new game or hear the top 10 high scores?"
<br/>
User: "Hear the top ten high scores"
<br/>
Alexa: "Ready to be awed and inspired? Behold, the crème de la crème of Dice Game players: 1: Kartik with a score of 31. 2: Gary with a score of 28. 3: Jane with a score of 20. 4: Brianna with a score of 20. 5: Jim with a score of 14. 6:....."
<br/>
User: "Start a new game"
<br/>
Alexa: "You rolled a 5. Your score is now 5. The dice are itching to be rolled again. Will you take a chance and go for another round?"
<br/>
User: "Yeah"
<br/>
Alexa: "You rolled a 4. Your score is now 9. The dice are itching to be rolled again. Will you take a chance and go for another round?"
<br/>
User: "Nah"
<br/>
Alexa: "Gotcha. Do you want to add your name to the high score list? If so, also provide your name. Otherwise quit."
<br/>
<User Can say "No quit" or "Yes add name <name> or a similar phrase>
User: "Yes add name Kartik"
<br/>
Alexa: "Congratulations, Kartik. Your score has been added to the high score list. Thanks for playing our Dice Game! Hope you had a blast and didn't break any furniture."

<hr>

Note: This skill also properly handles invalid inputs using FallbackIntentHandler. Here's how that looks -
<br />
User: "Alexa, open volley skill and turn on the game"
<br/>
Alexa: "Welcome to Volley's Dice Game! Do you want to start a new game or hear the top 10 high scores?"
<br/>
User: "ajhsbdfjsds sdifubkkd"
<br />
Alexa: "I'm sorry, I don't understand what you're trying to say. Please try saying something like "start a new game", "roll the dice", "yes continue", "no don't continue", or "top ten high scores" to interact with the game. If you need help, you can say "help" at any time to hear a list of available commands."
<br />
User: "help"
<br />
Alexa: "Here are some commands you can say: "turn on the game", "start a new game", "top ten high scores", "roll the dice", "yes continue", "no don't continue", "yes add name xyz", "no don't add name", and more"

## Technical details

This skill was developed by utilizing AWS Lambda and the Alexa Skills Kit SDK for Node.js with TypeScript, and integrating DynamoDB as the database to store High Scores. The code includes [8 important handlers](https://github.com/kartikson1/alexa-dice-roll-game/tree/main/src/handlers) apart from the in-built ones for intents that handle the functionality of the game.

While I have attempted to handle some of the edge cases and unexpected inputs, I would love the opportunity to fix, refine, or develop anything I might have missed.

## Lambda details

I have allowed execute-api:Invoke for all resources in my Lambda, so it can be invoked by any client including the reviewers of this assignment. The ARN can be found in package.json.

## Alexa skill details

Skill ID: amzn1.ask.skill.9b9c5176-06c2-4ca6-9091-1f316b3d2b41

## Tests

[Tests](https://github.com/kartikson1/alexa-dice-roll-game/tree/main/src/tests) shall be implemented with Jest, a testing framework for Node. The following tests can be written using mock data:

1. Unit tests, for each handler
2. Integration tests

## Event tracking

Event tracking mechanisms can be set up using CloudWatch
