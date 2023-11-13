const express = require('express');
const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const quotesRouter = express.Router()

module.exports = quotesRouter

quotesRouter.get('/random', (req, res) => {
    const randomQuote = getRandomElement(quotes)
    // console.log(randomQuote)
    if (randomQuote) {
        res.status(200).json({quote: randomQuote});
    } else {
        res.status(500).send('Unable to find quote')
    }
})

quotesRouter.get('/', (req, res) => {
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

quotesRouter.post('/', (req, res) => {
    if(req.query.person && req.query.quote && req.query.year) {
        const newQuote = {
            id: quotes.length + 1,
            quote: req.query.quote,
            person: req.query.person,
            year: req.query.year 
        }
        // console.log(newQuote)
        quotes.push(newQuote)
        res.status(201).json({quote: newQuote})
    } else {
        res.status(404).send()
    }
})

quotesRouter.put('/:id', (req, res) => {
    const quoteIndex = quotes.findIndex(quote => quote.id === req.params.id)
    let foundQuote = quotes[quoteIndex]
    
    if (!foundQuote) {
        res.status(404).send()
    } else {
        foundQuote = {...foundQuote,
            quote: req.query.quote, 
            person: req.query.person,
            year: req.query.year
        }
        // console.log(foundQuote)
        res.status(200).json({quote: foundQuote})
    }
})

quotesRouter.delete('/:id', (req, res) => {
    const quoteIndex = quotes.findIndex(quote => quote.id === req.params.id)
    let foundQuote = quotes[quoteIndex]
    
    if (!foundQuote) {
        res.status(404).send()
    } else {
        // const newQuotes = quotes.filter(quote => quote !== foundQuote) 
        quotes.splice(quoteIndex, 1)
        res.status(200).json({quote: foundQuote})
    }
    // console.log(quotes)
})
