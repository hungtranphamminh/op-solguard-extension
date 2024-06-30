import packageJson from './package.json'

/**
 * After changing, please reload the extension at `chrome://extensions`
 */
const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: 'Shield Extension',
  version: packageJson.version,
  description: packageJson.description,
  background: {
    service_worker: 'src/pages/background/index.js',
    type: 'module',
  },
  action: {
    default_popup: 'src/pages/index.html',
    default_icon: 'logo.png',
  },
  icons: {
    '16': 'logo.png',
    '32': 'logo.png',
    '48': 'logo.png',
    '128': 'logo.png',
  },
  content_scripts: [

  ],
  content_security_policy: {
    extension_pages: "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';"
  },
  externally_connectable: {
    matches: ['http://*/*', 'https://*/*'],
  },
  web_accessible_resources: [
    {
      resources: ['src/assets/images/*'],
      matches: ['*://*/*'],
    },
    {
      resources: [
        'assets/js/*.js',
        'assets/css/*.css',
        'assets/gif/*',
        'assets/png/*',
        'src/pages/types/index.js',
        'src/pages/inject/index.js',
        'src/pages/dappApi/index.js',
      ],
      matches: ["<all_urls>"],
    },
  ],
  host_permissions: [
    "<all_urls>"
  ],
  permissions: ['storage', 'tabs', 'scripting'],
}

export default manifest
