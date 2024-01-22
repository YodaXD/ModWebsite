const app = require('./client.js');
const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});