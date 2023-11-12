const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes)
    // console.log(randomQuote)
    if (randomQuote) {
        res.status(200).json({quote: randomQuote});
    } else {
        res.status(500).send('Unable to find quote')
    }
})

app.get('/api/quotes', (req, res) => {
    if(!req.query.person){
        // console.log(req.query)
        res.status(200).json({quotes: quotes});
    } else {
        foundQuote = quotes.filter(quote => quote.person.toLowerCase() === req.query.person.toLowerCase())
        // console.log(foundQuote)
        if(!foundQuote) {
            res.status(404).send(`Couldn\'t find quote from author "${req.query.person}"`)
        }
        else {
            res.status(200).json({quotes: foundQuote})
        }
    }
})

app.post('/api/quotes', (req, res) => {
    if(req.query.person && req.query.quote) {
        const newQuote = {
            id: quotes.length + 1,
            quote: req.query.quote,
            person: req.query.person,
        }
        // console.log(newQuote)
        quotes.push(newQuote)
        res.status(201).json({quote: newQuote})
    } else {
        res.status(404).send()
    }
})

app.put('/api/quotes/:id', (req, res) => {
    console.log(req.params.id)
    const findQuote = quotes.filter(q => q.id === req.params.id)
    console.log(findQuote)
    const quoteIndex = quotes.findIndex((quote) => quote.id === req.params.id)
    console.log(quoteIndex)
    const foundQuote = quotes[quoteIndex]
    console.log(foundQuote)
    
    if (!foundQuote) {
        res.status(404).send()
    } else {
        foundQuote.quote = req.query.quote
        foundQuote.person = req.query.person
        res.status(200).json({quote: foundQuote})
    }
})

app.listen(PORT, () => console.log(`listeting on port ${PORT}`));