import config from "./config";
import App from "./app";
import Logger from "./lib/Logger";

const app = new App();

const server = app.server.listen(config.server.port, () => {
    Logger.info(`Server is running on port: ${config.server.port}`)
});

export default server;