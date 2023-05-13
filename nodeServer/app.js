const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const swaggerUI = require("swagger-ui-express"), swaggerDocument = require('./openapi.json');

// Create express app
const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Configure middleware
app.use(bodyParser.json());

app.use(cors());

// Define endpoints
app.get('/api/movie', (req, res) => {
  const options = {
    hostname: 'localhost',
    port: 80,
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

app.get('/api/movie/findMovieById/:id', (req, res) => {
  const id = req.params.id;
  const options = {
    hostname: 'localhost',
    port: 80,
    path: `/?id=${id}`,
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
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(JSON.stringify(req.body))
    }
  };

  const proxyReq = http.request(options, (proxyRes) => {
    let data = '';

    proxyRes.on('data', (chunk) => {
      data += chunk;
    });

    proxyRes.on('end', () => {
      let result;
      try {
        result = JSON.parse(data);
      } catch (e) {
        console.log('ERROR: ' + e);
        return res.status(404).json({ error: 'Movie not found' });
      }
      if (!result) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.send(result);
    });
  });

  proxyReq.write(JSON.stringify(req.body));

  req.pipe(proxyReq, {
    end: true
  });
});

app.put('/api/movie/:id', (req, res) => {
  const params = {
    id: req.params.id,
    title: req.query.title,
    description: req.query.description,
    cast: req.query.cast
  }
  if (!params.title || !params.description || !params.cast) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const options = {
    hostname: 'localhost',
    port: 80,
    path: '',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(JSON.stringify(params))
    }
  };

  const proxyReq = http.request(options, (proxyRes) => {
    let data = '';

    proxyRes.on('data', (chunk) => {
      data += chunk;
    });

    proxyRes.on('end', () => {
      let result;
      try {
        result = JSON.parse(data);
      } catch (e) {
        console.log('ERROR: ' + e);
        return res.status(404).json({ error: 'Movie not found' });
      }
      if (!result) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.send(result);
    });
  });

  proxyReq.write(JSON.stringify(params));

  req.pipe(proxyReq, {
    end: true
  });
});

app.delete('/api/movie/:id', (req, res) => {
  const id = req.params.id;
  const options = {
    hostname: 'localhost',
    port: 80,
    path: `/?id=${id}`,
    method: 'DELETE',
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

// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
