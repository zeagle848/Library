# Library

## Table of Contents

- [Introduction](#introduction)
- [Get Started](#get-started)
- [Development Notes](#development-notes)
- [Testing](#testing)

## Introduction

This library application was developed as a part of the open-source web develoment course known as The Odin Project(TOP). The link to the assignment page can be found [here](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/library).

## Get Started

Before we can start the live server we must first make sure that Node.js is installed. Check by opening your console and running `node -v`. If you can't see a version number you must install Node.js. 

To view the app locally you can begin by installing the dependencies...

`npm install`

...and then start by running:

`npm run serve`.

The application should be live on `http://localhost:8080/` if it doesn't open automatically. 

## Development Notes

This is the first app developed as a part of TOP that makes use of session storage. Session storage uses the Storage object to save session data that expires only once the page session ends. Session storage saves the array called `library`, which hold all the book objects that contains author, book name, number of pages, whether the book is read and the unique ID, each time a new book is added, removed or modified. It does so by converting the library array into a JSON file that is then saved using session storage. The only property of a book that the user modify, that is once the book has already been added, is the `isRead` property. This is moddled with a checkbox input on the book card. When the page is visited or refreshed, the program recieves the library from session storage. We use short-circuit evaluation to either assign the library array to what session storage returns, but if nothing is returned, i.e. a falsy value, then we assign the library variable an empty array.

The user can interact with with four buttons on the header banner. The add book button, refresh library button, populate library button and delete library button. 

The add book button simply displays a modal with a form asking the user for information regarding the book, and once submitted displays the submitted book using the `createCard` function. The modal will only submit if the input fields are all correct. The pages input has to contain a number and the user can input any string for the author and book name feild, but both fields have to contain _something_. 

The delete library button is fairly self explanatory. It makes the library array stored in the `library.js` file equal to an empty array and clears the display of all book cards. The user can also choose to delete individual books by simply clicking the red X at the top right of the book card.

Populate library and refresh library are both buttons meant to display the functionality of the application itself. The populate library button populates the display with three books and can be clicked as many times as the user wishes. This skips the tedium of adding your own books via the modal and demonstrates the core functionality of the app. The refresh library clears the library and then populates the library using the array of book objects that have been saved. To the user it appears that nothing has happened but again this demonstrates the fact that any changes made to the library are saved and can be constantly updated. 

These buttons were originally used for testing the application before I created end to end tests using cypress, but I decided to keep them as they add more the user experiance.

## Testing

To run the testing environment we need to deploy the application first. The process is the same as what was outlined in the Getting Started section. We begin by making sure all the dependencies are installed by running `nmp install` in the console and then run the dev server by running `npm run serve`. 

Once the dev server is up and running we simply run `npm run e2e` and cypress should open a window where you run the tests by clicking the `sample_spec.js` file in the same window.
