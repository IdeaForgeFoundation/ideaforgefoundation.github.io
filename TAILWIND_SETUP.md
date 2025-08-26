# Setting up Tailwind CSS Locally

This document provides instructions for setting up a local build process for Tailwind CSS to replace the CDN link used in the HTML files.

## Recommended Method: Standalone CLI

This is the recommended approach as it does not require Node.js or npm and is less prone to environment issues.

1.  **Download the Standalone CLI**

    Go to the [Tailwind CSS releases page](https://github.com/tailwindlabs/tailwindcss/releases) and download the appropriate standalone executable for your operating system (e.g., `tailwindcss-windows-x64.exe` for Windows, `tailwindcss-linux-x64` for Linux).

2.  **Prepare the Project**

    *   Create a `bin/` directory in the root of the project and place the downloaded executable inside it.
    *   (Optional but recommended) Rename the executable to `tailwindcss` for convenience.
    *   On macOS and Linux, you will need to make the file executable by running `chmod +x bin/tailwindcss`.

3.  **Create the Input CSS File**

    *   Create a `src/` directory in the root of the project.
    *   Inside `src/`, create a file named `input.css` with the following content:

        ```css
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        ```

4.  **Create the Tailwind Configuration File**

    *   In the root of the project, create a file named `tailwind.config.js` with the following content:

        ```javascript
        /** @type {import('tailwindcss').Config} */
        module.exports = {
          content: [
            "./*.html",
            "./**/*.html",
          ],
          theme: {
            extend: {},
          },
          plugins: [],
        }
        ```

5.  **Build the CSS**

    *   Run the following command from the root of the project to build your CSS file. This will scan your HTML files and generate a `dist/output.css` file with all the necessary Tailwind styles.

        ```bash
        ./bin/tailwindcss -i src/input.css -o dist/output.css --minify
        ```

6.  **Update Your HTML Files**

    *   In each HTML file (`index.html`, `board.html`, `campaign.html`), remove the Tailwind CSS CDN script tag:

        ```html
        <script src="https://cdn.tailwindcss.com"></script>
        ```

    *   Add a link to your newly generated stylesheet in the `<head>` of each HTML file:

        ```html
        <link href="dist/output.css" rel="stylesheet">
        ```

## Alternative Method: Using npm

This method requires Node.js and npm to be installed on your system.

1.  **Initialize a Node.js Project**

    ```bash
    npm init -y
    ```

2.  **Install Tailwind CSS**

    ```bash
    npm install -D tailwindcss
    ```

3.  **Create the Configuration and Input Files**

    Follow steps 3 and 4 from the "Standalone CLI" method above.

4.  **Add a Build Script**

    Open your `package.json` file and add a "build" script to the `scripts` section:

    ```json
    "scripts": {
      "build": "tailwindcss -i src/input.css -o dist/output.css --minify",
      "test": "echo \"Error: no test specified\" && exit 1"
    }
    ```

5.  **Build the CSS**

    ```bash
    npm run build
    ```

6.  **Update Your HTML Files**

    Follow step 6 from the "Standalone CLI" method above.
