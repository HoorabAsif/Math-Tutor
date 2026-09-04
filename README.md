## Math Tutor

## An AI-powered mathematics learning companion

Math Tutor is an interactive mathematics learning application designed around a simple idea: students should be able to understand a problem, not just receive its answer.

Instead of giving every question the same response, Math Tutor provides different learning paths. A student can ask for a concept explanation, receive a hint, check their own work, view a complete solution, or generate additional practice questions.

## Why I Built It

While learning mathematics, I noticed that getting an answer is often much easier than understanding why that answer is correct. I wanted to build a tool that would make the process more interactive and encourage students to work through problems themselves.

I therefore designed Math Tutor around a progression from understanding → guidance → verification → solution → practice, rather than treating AI as an answer generator.

## What I Built

The application combines a browser-based interface with a Node.js backend and an AI-powered tutoring system.

Key features include:

- Concept Explanation — explains the mathematical idea behind a question without immediately solving it.
- Hints — provides a short next-step hint while avoiding the final answer.
- Answer Checking — evaluates a student's answer or working and identifies mistakes.
- Step-by-Step Solutions — provides a structured solution when the student needs it.
- Practice Generation — creates new questions based on the same mathematical concept at different difficulty levels.
- Multimodal Input — allows mathematical questions to be submitted through text and supported file/image input.
- Scientific Calculator — supports mathematical operations and functions directly within the interface.
- Mathematical Symbols — provides quick access to commonly used mathematical notation.
- Voice Input — allows questions to be entered through speech.
- Streaming AI Responses — responses are displayed progressively rather than requiring the user to wait for the entire response before seeing anything.

## Technical Implementation

Frontend

- HTML
- CSS
- JavaScript

Backend

- Node.js
- Express
- AI API integration
- Asynchronous request handling
- Streaming responses

I implemented the interface, frontend interactions, mathematical utilities, backend communication, response formatting, loading states, and error handling while repeatedly testing the system across different features.

## Development Process

Building Math Tutor was not a single-pass project. A major part of the development process was debugging and refining the interaction between the frontend and backend.

I worked through issues involving API requests, failed responses, asynchronous behavior, streaming output, file handling, UI states, mathematical formatting, calculator behavior, and JavaScript event handling.

Rather than replacing the application whenever something failed, I repeatedly isolated individual problems, tested changes, and preserved working functionality while fixing the affected component.

This process taught me that building an application is not only about writing code—it is also about debugging systematically, understanding how different components interact, and making careful changes without breaking existing behavior.

## What I Learned

Through this project, I developed practical experience with:

- Building a complete frontend interface
- Connecting a frontend to a backend
- Working with APIs
- Handling asynchronous JavaScript
- Implementing streamed responses
- Processing user-uploaded files
- Designing AI interactions around specific learning goals
- Debugging complex frontend/backend interactions
- Structuring a project for deployment and public use

## Future Development

Possible future directions include adaptive difficulty, student progress tracking, personalized practice, stronger mathematical reasoning tools, and additional curriculum-specific support.

---

Math Tutor is an ongoing personal software project focused on using AI to make mathematics learning more interactive, guided, and student-centered.
