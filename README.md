# Mister IA

To install dependencies:

```bash
bun install
```

To run in development mode:

```bash
bun run dev # watches changes and builds to dist
bun run serve # serves the dist directory
```

Then in your browser, go to the preprod url to see the output. In the console, type
```bash
localStorage.setItem("devMode", "true");
```
and refresh the page to use the code in your localhost.

In production, you have to tag the commit with the version number, and then update the `SCRIPT_TAG` in the Webflow site settings > custom code > head > script tag.