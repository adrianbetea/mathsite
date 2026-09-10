# MathHub

**MathHub** is a full educational platform for learning math, live at [mathhub.me](https://mathhub.me).

## Features

- **Daily challenges** - a new math problem every day.
- **Matrix calculator**
- **Polynomial/Function calculator and plot builder**
- **Calculus calculator**
- **3 full learning areas** covering structured math content end to end:
    - **Polynomials** - full course
    - **Linear Algebra** - full course
    - **Calculus** - full course
- **Problems page** - 30 practice problems per category, progress stored in web storage.
- **6 languages** - Romanian, English, German, French, Polish, Spanish.

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Cloudflare Workers/Functions
- **Deployment:** Custom CI/CD pipeline to Cloudflare Workers, with the `mathhub.me` domain

## Deployment

The full deployment pipeline - domain, build, and release to Cloudflare Workers - was designed and set up end to end for this project.
