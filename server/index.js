const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const controlValveActiveRoutes = require('./routes/controlValveActiveRoutes');
const controlValveSpareRoutes = require('./routes/controlValveSpareRoutes');
const flowMeterActiveRoutes = require('./routes/flowMeterActiveRoutes');
const flowMeterSpareRoutes = require('./routes/flowMeterSpareRoutes')
const getColumnsRoutes = require('./routes/getColumnRoutes');

// const { authMiddleware } = require('./middlewares/authMiddleware');

const app = express();
const port = process.env.PORT || 5500;

// Middleware setup
app.use(cors());
app.use(express.json());




app.get('/', (req, res) => {
  res.send('API is running...');
});

// API routes with versioning (/v1)
app.use('/v1/api/control-valve-active', controlValveActiveRoutes);
app.use('/v1/api/control-valve-spare', controlValveSpareRoutes);
app.use('/v1/api/flow-meter-active', flowMeterActiveRoutes);
app.use('/v1/api/flow-meter-spare', flowMeterSpareRoutes);
app.use('/v1/api/get-columns', getColumnsRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});