const app = require("./src/app");
require("dotenv").config();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Meetify backend running on port ${PORT}`);
});
