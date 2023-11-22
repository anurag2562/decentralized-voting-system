const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const candidates = [
  { id: 1, name: 'Candidate A', votes: 0 },
  { id: 2, name: 'Candidate B', votes: 0 },
  { id: 3, name: 'Candidate C', votes: 0 },
];

const votedWallets = new Set();

app.use(express.static('public'));
app.use(express.json());

app.get('/candidates', (req, res) => {
  res.json(candidates);
});


app.post('/vote', (req, res) => {
    const { walletAddress, candidateId } = req.body;
  
    // Check if the wallet has already voted
    if (votedWallets.has(walletAddress)) {
      return res.status(400).json({ error: 'You have already voted.' });
    }
  
    // Find the selected candidate
    const candidate = candidates.find((c) => c.id === candidateId);
  
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found.' });
    }
  
    // Increment the candidate's votes and mark the wallet as voted
    candidate.votes += 1;
    votedWallets.add(walletAddress);
  
    res.json({ success: true });
  });

app.get('/results', (req, res) => {
  const results = candidates.map((c) => ({ name: c.name, votes: c.votes }));
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
