# 📚 Library Pro - Library Automation System

Library Pro is a modern and user-friendly library automation system designed to streamline the management of books, members, and lending/returning processes for libraries. Developed with React and Vite, this application features a clean interface and an easily manageable structure.

## ✨ Features

* **Book Management:** Add, edit, delete, and view details of books.
* **Member Management:** Register and manage library members. (To be implemented in the future)
* **Lending/Returning Operations:** Track the processes of borrowing and returning books. (To be implemented in the future)
* **Responsive Design:** Provides a seamless experience across various devices.
* **Fast Development Environment:** Quick startup and Hot Module Replacement with Vite.
* **TypeScript Support:** Utilizes TypeScript for safer and more scalable code.
* **Tailwind CSS:** Integrated with Tailwind CSS for rapid and flexible UI development.
* **Google Gemini API Integration:** (Although not actively used yet) It lays the groundwork for future AI-powered features as part of the project.

## 🚀 Technologies

* **Frontend:**
    * [React](https://react.dev/) (v19.1.0): For building user interfaces.
    * [Vite](https://vitejs.dev/) (v6.2.0): For a fast development environment and build tool.
    * [TypeScript](https://www.typescriptlang.org/) (v5.7.2): For type safety and scalability.
    * [React Router DOM](https://reactrouter.com/en/main) (v7.6.1): For SPA navigation.
    * [Tailwind CSS](https://tailwindcss.com/): For a rapid and customizable CSS framework (integrated via CDN).
* **API Integration:**
    * [@google/genai](https://www.npmjs.com/package/@google/genai) (v1.2.0): For interacting with the Google Gemini API.

## 📦 Setup

Follow these steps to get your project up and running on your local machine:

### Prerequisites

* [Node.js](https://nodejs.org/en/) (Preferably LTS version)
* [npm](https://www.npmjs.com/) (Comes with Node.js) or [Yarn](https://yarnpkg.com/)

### Steps

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/your-username/library-automation-system.git](https://github.com/your-username/library-automation-system.git)
    cd library-automation-system
    ```
    (If you have a Git repository, replace `your-username` with your actual username. Otherwise, navigate directly to the downloaded folder.)

2.  **Install Dependencies:**
    While in the project directory, run the following command to install all necessary dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set Environment Variables:**
    You need to set your `GEMINI_API_KEY` in a `.env.local` file. Create a new `.env.local` file in the project root directory (next to `README.md`) and add your Gemini API key to it:
    ```
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```
    * **Note:** To learn how to obtain your Google Gemini API key, please refer to the [Google AI Studio](https://aistudio.google.com/) documentation.

4.  **Run the Application:**
    To start the development server, use the following command:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will typically run at `http://localhost:5173` or another address specified in your terminal. Navigate to this address in your browser to view the application.

## ⚙️ Project Structure

library-automation-system/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, icons, etc.
│   ├── components/         # Reusable React components
│   │   ├── shared/         # General, shared components (Navbar, PageContainer, etc.)
│   │   └── ...
│   ├── pages/              # Application pages
│   │   ├── books/          # Book management pages
│   │   └── ...
│   ├── App.tsx             # Main application component
│   ├── constants.tsx       # Constants (app title, API model, icons)
│   ├── index.css           # Global CSS (if needed)
│   ├── index.tsx           # Entry point for the React application
│   └── types.ts            # TypeScript type definitions
├── .env.local              # Environment variables (ignored by Git)
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── package-lock.json       # Dependency lock file
├── README.md               # This file
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── ...


## 🛠️ Development Notes

* **API Key Management:** The `vite.config.ts` file retrieves the `GEMINI_API_KEY` from the `.env.local` file and injects it into the application as `process.env.GEMINI_API_KEY`. This is crucial for security, ensuring your API key is not directly exposed on the client side.
* **CDN Tailwind CSS:** Currently, Tailwind CSS is included via a CDN link within `index.html`. For larger projects, setting up Tailwind as a PostCSS plugin might be more efficient.
* **React Router DOM:** `HashRouter` is used for application navigation. This helps prevent issues with page refreshes on static file servers or simple hosting environments.
* **Typescript Path Alias:** An `@` alias is defined in `tsconfig.json` and `vite.config.ts`. This allows for cleaner module imports like `import SomeComponent from '@/components/SomeComponent';`.

## 🏗️ Building for Production

To create an optimized production build of the application:


npm run build
# or
yarn build
This command will compile the optimized files into the dist/ folder. You can then deploy the contents of this folder to any static file server (e.g., Netlify, Vercel, GitHub Pages).

🤝 Contributing
If you wish to contribute to the development, please follow these steps:

Fork this repository.
Create a new branch: git checkout -b feature/AmazingFeature
Make your changes.
Commit your changes: git commit -m 'Add some AmazingFeature'
Push to the branch: git push origin feature/AmazingFeature
Open a Pull Request.
