# LuckyLottery

This project is developed in Pixi.js v7.4.3

--index.html for handling the structure of UI

--style.cc for styling the UI layout -> styling is something that I am not really strong what I have added for styling is mostly from the internet

--main.ts sets up the application and initiate the game class, and also handles the button action with showing the results

--ball.ts handles the ball actions such as building, selection, deselecting, coloring

--game.ts basically this handles the core game logic starts with positioning the all ball, manual and lucky dip ball selection, finding the random winning numbers and keep track of randomaly selected winning numbers

Note - I have added a method for testing the win which is named as startDrawHigherWinning, and just need to pass the value to this method to see the winning, I have commentted out the example I did in main.ts class

There are few thing I basically dont understand why not working, I believe it could be typescript version or something but I am not sure that is why I added //@ts-ignore. As far as I researched it is typescript thinking it could be null but never
encountered this issue before ever in my life of coding so this actually new to me.

To run the project

1) npm install

2) npm run build - if you want to build

3) npm start
