# Extension Amazon Payment

**Description:** Paylana - an innovative open-source browser extension developed by Esol Labs powered by Solana pay.

**Tech stack:** This is a [React](https://react.dev/) project bundled with [Vite ](https://vitejs.dev/) and [ICRXJS](https://crxjs.dev/vite-plugin)

## Scripts

Make sure to reserve localhost port 3000 when running this source.
In the project directory, you can run:

### `yarn dev`

Builds the app in the development mode and create a `dist` folder which is an unpacked version of the extension.

To load this extension to chrome, zip the `dist` folder after the build process first. Navigate to the [chrome's extension management page](chrome://extensions/) and turn on developer mode. Click `load unpacked` and upload your zip file to install it to chrome.

The extension pages will reload when you make changes. To have the console log of its service worker, click the `Inspect views` link. For popup pages ' consoles, inspect it normally as other browser tabs when they are opened.

### `yarn build`

Builds the app in the production mode and create a `dist` folder which is an unpacked version of the extension.

The build is minified and the filenames include the hashes.

All the uploading as well as inspecting with console can be done similar to the development mode.

## Usage Permissions

This is an open-source project, and all parties are welcome to view, use, and customize it. However, please be aware that this project is not intended for commercial use.

## Feedback

We welcome your feedback! If you have any comments, suggestions, or questions, please feel free to reach out to us at [hello@esollabs.com](mailto:hello@esollabs.com).
