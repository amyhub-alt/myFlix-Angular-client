# myFlix-Angular Client

##  Overview

The **myFlix-Angular** app is the client-side for a movie web application built using **Angular** and powered by an existing server-side REST API. This single-page, responsive app allows movie enthusiasts to browse information about movies, directors, and genres, as well as manage their personal profiles and favorite movies.

---

##  Objective

Build the client-side interface for the **myFlix** movie app using **Angular**, integrating with a previously built REST API. The app demonstrates essential Angular concepts and best practices, including routing, services, Angular Material design, form handling, and documentation with Typedoc and JSDoc.

---

##  Technologies Used

- Angular (v9+)
- Angular Material
- TypeDoc
- JSDoc
- Node.js
- npm
- GitHub Pages (for deployment)

---

##  Key Features

- **User Registration & Login**
- **Movie List View** (Displays all movies after login)
- **Movie Details View** (Detailed view for each movie)
- **Genre View** (View genre information)
- **Director View** (View director information)
- **User Profile View**
  - Update user information
  - Add/remove favorite movies
  - Delete user account
- Responsive design for mobile and desktop users

---

##  User Stories

- As a user, I want to **register**, **log in**, and **update my profile** so I can manage my movie preferences.
- As a user, I want to be able to **see information about movies, directors, and genres** so I can learn more about movies I’ve watched or want to watch.
- As a user, I want to be able to **save my favorite movies** to easily revisit them later.

---

##  Technical Requirements

- Angular (v9 or later)
- Node.js and npm (latest versions)
- Angular Material for UI components
- TypeDoc comments in Angular codebase
- JSDoc documentation in backend API
- Hosted on GitHub Pages

---

##  Project Structure

src/ ├── app/ │ ├── components/ │ │ ├── movie-card/ │ │ ├── user-profile/ │ │ ├── welcome-page/ │ │ └── dialog-content/ │ ├── services/ │ ├── app-routing.module.ts │ └── app.module.ts ├── assets/ ├── environments/

yaml
Copy
Edit

---

##  Deployment

This project is hosted on **GitHub Pages** and is accessible via your portfolio or direct link.

---

##  Project Setup

To install and run the app locally:

---

##  To build for production

ng build --base-href "https://amyhub-alt.github.io/myFlix-Angular-client/"


---
##  To deploy to Githib Pages:

ng deploy --base-href=/myFlix-Angular-client/


---



```bash
npm install
ng serve

