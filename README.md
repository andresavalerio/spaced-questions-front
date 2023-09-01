# How to run the project?

### First Install the Dependencies


```
$ npm i
```

### Then run the project for development

```
$ npm run dev
```

### For building the project

```
$ npm run build
```


### For testing the project

```
$ npm run test
```

# Tech Stack

- ### React : Library for user interfaces
- ### Vite : Tool for developing and building React apps
- ### Zustand : State Management library
- ### Axios : Rest Client library
- ### Vitest : Testing library
- ### react-router-dom : Library for routing in React
- ### Sweet Alert 2 : Library for alerts and messages 


# Concepts

### What is a Component?

Component is a fundamental building block used to create user interfaces.

### What is a Page?

Page is a set of components to build a full user interface.

### What is a Service?

Service is module that has specific logic for the application, like consuming API's, decision making, business logic, specific tasks, etc.

### What is Store?

Handles the State Management of the application, the one that let data flow throughout the app without difficulties

# File Structure

- `src/` : root folder
  - `components/` : contains all the components
    - `first-component` 
      - FirstComponent.css : styles of component
      - FirstComponent.spec.ts : tests for component
      - FirstComponent.tsx : component implementation
  - `pages/` : contains all the pages
    - `first-page` : a set of components that builds a full page
      - FirstComponent.css : styles of page
      - FirstComponent.spec.ts : tests for page
      - FirstComponent.tsx : page implementation

  - `services/` : contains all services
    - `my-service`
      - MyService.ts : service implementation
      - MyService.spec.ts : service tests
  - `stores/` : contains all stores
    - `my-store`
      - my-store.store.ts : stores implementation (there is no test)
  - `types/`
  - App.css : app styles
  - App.tsx : root of the project
  - index.css : global styles
  - main.tsx : bootstrap
  - routes.tsx : define all the routing and it's rules

