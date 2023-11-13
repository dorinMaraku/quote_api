const express = require('express');
const app = express();
const quotesRouter = require('./quotesRouter');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.use('/api/quotes', quotesRouter)

app.listen(PORT, () => console.log(`listening on port ${PORT}`));