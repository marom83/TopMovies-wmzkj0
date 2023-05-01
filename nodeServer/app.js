// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const swaggerUI = require("swagger-ui-express"),swaggerDocument = require('./openapi.json');

// Create express app
const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Configure middleware
app.use(bodyParser.json());

// Define initial list of movies
let movies = [
    {
        id: 1,
        title: 'The Shawshank Redemption',
        description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        cast: ['Tim Robbins', 'Morgan Freeman']
    },
    {
        id: 2,
        title: 'The Godfather',
        description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        cast: ['Marlon Brando', 'Al Pacino', 'James Caan']
    },
    {
        id: 3,
        title: 'The Dark Knight',
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart']
    }
];

// Define endpoints

app.get('/api/movie', (req, res) => {
    const id = req.query.id;
    const options = {
        hostname: 'localhost',
        port: 80,
        path: id ? '/?id=' + id : '/',
        method: 'GET',
      };

      const proxyReq = http.request(options, (proxyRes) => {
        let data = '';
    
        proxyRes.on('data', (chunk) => {
          data += chunk;
        });
    
        proxyRes.on('end', () => {
          const result = JSON.parse(data);
          if (!result) {
            return res.status(404).json({ error: 'Movie not found' });
          }
          res.send(result);
        });
      });
    
      req.pipe(proxyReq, {
        end: true
      });
});

app.post('/api/movie', (req, res) => {
    const { title, description, cast } = req.body;
    if (!title || !description || !cast) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const options = {
        hostname: 'localhost',
        port: 80,
        path: '',
        method: 'POST',
      };

      const proxyReq = http.request(options, (proxyRes) => {
        let data = '';
    
        proxyRes.on('data', (chunk) => {
          data += chunk;
        });
    
        proxyRes.on('end', () => {
          const result = JSON.parse(data);
          if (!result) {
            return res.status(404).json({ error: 'Movie not found' });
          }
          res.send(result);
        });
      });
    
      req.pipe(proxyReq, {
        end: true
      });
});

app.put('/:id', (req, res) => {
    const { title, description, cast } = req.body;
    if (!title && !description && !cast) {
        return res.status(400).json({ error: 'Missing fields to update' });
    }
    const movie = movies.find(movie => movie.id === req.params.id);
    if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
    }
    if (title) {
        movie.title = title;
    }
    if (description) {
        movie.description = description;
    }
    if (cast) {
        movie.cast = cast;
    }
    res.json(movie);
});

app.delete('/:id', (req, res) => {
    const movieIndex = movies.findIndex(movie => movie.id === req.params.id);
    if (movieIndex === -1) {
        return res.status(404).json({ error: 'Movie not found' });
    }
    movies.splice(movieIndex, 1);
    res.status(204).end();
});

// Start server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
