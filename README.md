
### ES6 Boilerplate

This ES6 boilerplate provides a basic setup for building modern JavaScript applications using Webpack. It includes development and production configurations.

#### Project Structure

- `src/`: Source code directory.
- `dist/`: Output directory for bundled files.
- `webpack.config.js`: Webpack configuration for development.
- `prod.config.js`: Webpack configuration for production.

#### Scripts

- **Start Development Server:**
  ```bash
  npm start
  ```
  Starts the development server using `webpack-dev-server` and opens the application in the default web browser.

- **Build Development Bundle:**
  ```bash
  npm build
  ```
  Builds the development bundle with Webpack in watch mode.

- **Build Production Bundle:**
  ```bash
  npm run prod
  ```
  Builds the production bundle with Webpack using the `prod.config.js` configuration.

#### Dependencies

- **Webpack and Related Packages:**
  - webpack: ^5.68.0
  - webpack-cli: ^4.9.2
  - webpack-dev-server: ^4.7.3
  - terser-webpack-plugin: ^5.3.3
  - copy-webpack-plugin: ^10.2.4
  - html-webpack-plugin: ^5.5.0

- **Babel and Loader Packages:**
  - @babel/core: ^7.16.12
  - @babel/preset-env: ^7.16.11
  - babel-loader: ^8.2.3

- **Style and Asset Loaders:**
  - css-loader: ^6.5.1
  - sass-loader: ^12.4.0
  - style-loader: ^3.3.1
  - file-loader: ^6.2.0
  - url-loader: ^4.1.1

- **Web Animation and Audio Libraries:**
  - gsap: ^3.9.1
  - howler: ^2.2.3
  - pixi.js: ^7.2.4
  - pixi-spine: ^4.0.4
  - three: ^0.158.0

#### Usage

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Use the provided scripts to start the development server, build development bundles, or build production bundles.

Feel free to explore and modify the configurations based on your educational needs.

---

This boilerplate aims to provide a foundational structure for teaching and learning ES6 and Webpack in the context of modern JavaScript development.
