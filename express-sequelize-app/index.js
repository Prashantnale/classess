const express = require('express');
const { sequelize, Class, Student } = require('./models');

const app = express();
app.use(express.json());

// Sync database
sequelize.sync().then(() => {
  console.log('Database synced successfully!');
});

app.get('/', (req, res) => {
  res.send('Welcome to the Express Sequelize App');
});

// Create a Class
app.post('/classes', async (req, res) => {
  try {
    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a Student
app.post('/students', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Classes with their Students
app.get('/classes', async (req, res) => {
  try {
    const classes = await Class.findAll({
      include: [{
        model: Student,
        as: 'students'
      }]
    });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Students with their Class
app.get('/students', async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [{
        model: Class,
        as: 'class'
      }]
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
