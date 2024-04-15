import express from 'express';
import multer from 'multer';  
import csv from 'csv-parser';
import fs from 'fs';
import { type } from 'os';
const app = express();
const PORT = process.env.PORT || 3000;

const upload = multer({ dest: 'uploads/' });
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/process_csv', upload.single('file'), (req, res) => {
  
  if (!req.file) {
    return res.status(400).json({ error: 'No file provided' });
  }
  if (!req.file.originalname.endsWith('.csv')) {
    return res.status(400).json({ error: 'Invalid file format, must be CSV' });
  }
  const results = [];
  

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => {

      const date=new Date(data['datetime']);
      const top_10=JSON.parse(data['top_10'].replace(/'/g, '"'));
      const percent_change_values=JSON.parse(data['percent_change_values'].replace(/'/g, '"'));
      let finalPortfolioValue = 0;
      const soltswise=[];
      for (let i = 0; i < top_10.length; i++) {
        finalPortfolioValue += 100 * (1 + parseFloat(percent_change_values[i]) / 100);
        soltswise.push({stock: top_10[i], value: 100 * (1 + parseFloat(percent_change_values[i]) / 100)});
      }
      results.push({ datetime: date,slots:soltswise, final_portfolio_value: finalPortfolioValue });
    })
    .on('end', () => {

      fs.unlinkSync(req.file.path);

      res.status(200).json({ results });
    })
    .on('error', (err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
     });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
