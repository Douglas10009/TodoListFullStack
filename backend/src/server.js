const app = require('./app');
require('dotenv').config();

// Se caso a variavel de ambiente não existir, ele roda no 8080
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
