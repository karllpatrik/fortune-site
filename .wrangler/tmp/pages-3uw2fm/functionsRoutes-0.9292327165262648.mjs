import { onRequest as __ask_js_onRequest } from "/home/petrischk/fortune/fortune-site/functions/ask.js"

export const routes = [
    {
      routePath: "/ask",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__ask_js_onRequest],
    },
  ]