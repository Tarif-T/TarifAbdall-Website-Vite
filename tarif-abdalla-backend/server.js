const dotenv = require("dotenv");
const app = require("./src/app");
const connectDatabase = require("./src/config/db");

dotenv.config();

const port = process.env.PORT || 3000;

(async () => {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
})();
