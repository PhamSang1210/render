import accessRouter from "./access/access.route.js";
import testRouter from "./test/test.route.js";

function route(app) {
    app.use("/v1/api/shop", accessRouter);
    app.use("/", testRouter);
}

export default route;
