# Hotel Messenger

### Getting Started

`npm install`

`npm start`

That's it! You can interact with the program inside the terminal.

### Design Decisions

I took a (to my best knowledge) strong Object Oriented approach to the app. Almost everything lives inside a class or interface and classes are able to call each other's method when appropiate. The index.js contains the App class which is mostly responsible for executing all of the App's logic. I also set up class models to define the structure of data and provide helpful methods.

### Language

I used Typescript for this project. This is actually my first time using Typescript, but I've wanted to play with it for a while and thought this was a good opprotunity to learn something new. 

### Testing

To ensure correctness of my program, I made sure to take the time to configure ESLint with Typescript plugins to warn me of certain issues before runtime. During runtime, I did most of my debugging manually. If I needed to test a method somewhere I would simply call it from the start method inside App.

### Moving forward

If I had more time I would add a testing library such as Jest or Jasmine to test some of my helper methods. The runInquirer method inside App is also very long so it would be nice to find an appropiate place to break out those
Prompt constants at the very least. Also, the text can feel kind of cramped on the screen, obviously the terminal isn't going have the greatest UI, but there may be opprotunity for increased whitespace and text formatting.
