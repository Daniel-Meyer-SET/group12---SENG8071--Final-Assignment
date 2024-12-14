import app from "./app";
import dotenv from "./config/dotenv";

const PORT = dotenv.PORT;

app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`)
});