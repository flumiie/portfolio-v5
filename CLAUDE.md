# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Run development server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

## Architecture

This project is a vanilla JavaScript web application that simulates an Operating System. 

- **Entry Point**: `src/main.js` handles core initialization.
- **Modules**: Logic is modularized in `src/`, with specific functionality (e.g., terminal, notepad, radar) separated into individual files.
- **Styling**: Structured modular CSS files located in `src/styles`.
- **Build System**: Uses [Vite](https://vitejs.dev/) to bundle and serve the application.
