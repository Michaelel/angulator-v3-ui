# angulator-v3

Simplified shazam in a playful way.

##Table of contents

- [Getting started](#getting-started)
- [How to use](#how-to-use)
- [Technical requirements](#technical-requirements)
- [Demo](#demo)


## Getting started

* Clone it from GitHub repo

``git clone https://github.com/Michaelel/angulator-v3-ui.git``

* Open from the terminal project root directory

* Install packages

``npm i``


* Build project in watch mode, through command

``ng serve -o``

* Your browser will open after build finished in the route ``localhost:4200``


## How to use

In the menu of the game you have two buttons:
* Play
* Stats

To play in the game you should enter your email, which will be saved in the local storage. 
Later you could change it by clicking on the icon in the top right angle of the page.

Then you might play in 3 types of game:
* Sound
* Humming
* Lyrics

There are three icons with tooltips.

In the first type, you should record the song playing.

In the second type, you should record your signing.

In these types of the game, the app recorded this sound (max record time is 10 seconds). 
Then you can listen to it and rerecord if it sounds bad. If you make sure that record 
sounds good you should click on the `find` button.

In the third type of game (lyrics) you should type the title of the song or some row from
there (min symbols are 5, max symbols are 255) and then click `find` button.

The next step in a suggestion from our Angulator, what song you just proposed.

There are two types of the result page:
* Something found
* Nothing found

If Angulator couldn't find anything, you automatically win in this game.

If Angulator found something, you should answer is it the correct thing.

Your answer `correct` means that Angulator won.
Your answer `incorrect` means that you won.

On the stats page you can check all your games.

For each game you can see this info:
* Id of the game
* Winner
* Game date and time  
* Game type
* Suggest your lyrics or audio (you can read it or reproduce record)
* Title of the song by Angulator version
* 30 seconds demo of the song by Angulator version


## Technical requirements

The application has an adaptive layout, so you can run it from any 
device in your browser.


## Demo
[Working Demo](https://angulator-v3-ui.herokuapp.com)
