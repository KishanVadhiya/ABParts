const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const controlValveActiveRoutes = require('./routes/controlValveActiveRoutes');
// Future: Add other routes as needed, e.g. controlValveSpareRoutes, flowMeterRoutes, etc.

// Middleware imports
const { authMiddleware } = require('./middlewares/authMiddleware');

const app = express();
const port = process.env.PORT || 5500;

// Middleware setup
app.use(cors());
app.use(express.json());

// Placeholder for global authentication (uncomment if needed in the future)
// app.use(authMiddleware);

// Default route (health check or root endpoint)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// API routes with versioning (/v1)
app.use('/v1/api/control-valve-active', controlValveActiveRoutes);
// Future: Add other route prefixes as needed
// app.use('/v1/api/control-valve-spare', controlValveSpareRoutes);
// app.use('/v1/api/flow-meter-active', flowMeterActiveRoutes);
// app.use('/v1/api/flow-meter-spare', flowMeterSpareRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});