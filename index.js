const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.get('/api/scripture', async (req, res) => {
  const { bookId, chapter, startingVerse, endingVerse } = req.query;
  try {
    const response = await axios.get(`https://bible-go-api.rkeplin.com/v1/books/${bookId}/chapters/${chapter}?translation=NIV`);
    
    if (startingVerse === endingVerse) {
        const verse = response.data[startingVerse-1].verse;
        res.type('text/plain');
        res.send(verse);
    } else {
        let verse = '';
        for (let i = startingVerse-1; i < endingVerse - 1; i++) {
            verse += response.data[i].verse + " ";
        }
        verse += response.data[endingVerse-1].verse;

        console.log(verse);

        res.send(verse);
    }
    
  } catch (error) {
    console.error('Error fetching scripture:', error.message);
    res.status(500).json({ error: 'Error fetching scripture' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
