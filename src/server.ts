import { app } from "./app";
import { env } from "./env";


const port = env.PORT || 3333
app.listen({
    port,
    host: '0.0.0.0'

}).then(() => {
    console.log("🚀 HTTP Server Running.: " + port)
})