
## 🚀 Getting Started

To get the project up and running locally, follow these steps:

1. **Clone the repository** and navigate to the project directory:

    ```bash
    git clone https://github.com/your-username/technical-test-front-task.git
    cd technical-test-front-task
    ```

2. **Copy the environment configuration**:

    ```bash
    cp .env.example .env
    ```

3. **Install dependencies**:

    ```bash
    npm install
    ```

4. **Run the development server**:

    ```bash
    npm run dev
    # Visit http://localhost:3000 in your browser
    ```

    `NEXT_PUBLIC_API_BASE=https://dummyjson.com`


## ✅ Requirements to Implement (Mandatory)

✅ **Auth Facade** (simulated session) with **guards**: Redirect to `/login` if the user is not authenticated.
✅ **/products**: Implement search (with debounce), category filters, pagination, and UI states (loading, error, empty).
✅ **/orders**: Display **carts** from the DummyJSON API (readonly), and optionally, create a **“Local Orders”** section after a simulated checkout.
✅ **/metrics**: Display KPIs for users (from DummyJSON), orders & revenue for the last 7 days (local), and a mini chart.
✅ **Quality**: Focus on typed code, reusable components, accessibility, and responsiveness.

## 🧩 Key Files to Complete

✅ **`src/lib/api.ts`**: All the fetch functions are **TODO** (to be implemented).
✅ **`src/lib/auth.ts`**: Implement functions such as `isAuthed`, `setToken`, and `clearToken`.
✅ **`src/components/Guard.tsx`**: Activate the redirection logic once the authentication flow is ready.
✅ **`src/app/*/page.tsx`**: Implement each page (marked as **TODO**).

## 🧪 Minimum Tests

**Note:** These tests are **not fully implemented** yet. The basic structure in place, but the test coverage is still under development.

- Implement at least **2 component tests** and **1 integration test** (your choice).

---


## 🧪 Running Tests

To run the tests in the project, follow these steps:

1. **Ensure dependencies are installed**:
    If you haven’t already installed the project dependencies, run the following command:

    ```bash
    npm install
    ```

2. **Run unit and integration tests**:
    You can run the tests using **Vitest** . To run all the tests, use the following command:

    ```bash
    npm run test
    ```

    This will execute all the tests in the project.


---

## ⚙️ Technologies & Libraries Used

This project was built using a modern stack of libraries and tools to ensure performance, scalability, and ease of development.

### Frontend

- **React** (v18.3.1)  
  A popular JavaScript library for building user interfaces.
  
- **Next.js** (v15.5.4)  
  A React framework that enables server-side rendering, static site generation, and API routes.

- **Tailwind CSS** (v3.4.12)  
  A utility-first CSS framework for rapidly building custom designs.

- **Zod** (v3.23.8)  
  A TypeScript-first schema declaration and validation library.

- **Recharts** (v3.2.1)  
  A charting library built with React for creating customizable charts.

### State Management & API Handling

- **React Query** (v5.59.16)  
  A powerful data-fetching and state management library for React, used for managing server state.

### Testing

- **Vitest** (v2.1.9)  
  A fast test framework heavily inspired by Jest, with built-in TypeScript support.

- **@testing-library/react** (v16.3.0)  
  A simple and complete testing library for React to encourage good testing practices.

- **@testing-library/jest-dom** (v6.9.1)  
  Extends Jest with custom matchers to test DOM elements.

- **JSdom** (v27.0.0)  
  A JavaScript implementation of the web standards, used for simulating a browser environment for tests.

### Development Tools

- **Vite** (with **vite-tsconfig-paths**)  
  A build tool that provides fast development and build times with support for TypeScript paths.

- **TypeScript** (v5.6.3)  
  A statically typed superset of JavaScript for improved developer experience and maintainability.

- **PostCSS** (v8.4.47)  
  A tool for transforming CSS with plugins, used in conjunction with Tailwind CSS.

- **Autoprefixer** (v10.4.20)  
  A PostCSS plugin to automatically add vendor prefixes to your CSS.

### Type Definitions

- **@types/react** (v18.3.5)  
  Type definitions for React, providing type support for JSX and hooks.

- **@types/react-dom** (v18.3.0)  
  Type definitions for ReactDOM, necessary for working with the DOM in React.

- **@types/node** (v20.11.30)  
  Type definitions for Node.js, ensuring type safety for server-side code.

---

