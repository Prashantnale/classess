const { sequelize, Class, Student } = require('./models');

async function seedDatabase() {
  try {
    // Force sync the database to drop existing tables and recreate them
    await sequelize.sync({ force: true });
    console.log('Database synced for seeding.');

    // Create dummy classes
    const class1 = await Class.create({
      name: '10th Grade A',
      description: 'Science Batch'
    });

    const class2 = await Class.create({
      name: '10th Grade B',
      description: 'Commerce Batch'
    });

    // Create dummy students
    await Student.bulkCreate([
      {
        name: 'Rahul Sharma',
        age: 15,
        rollNumber: '10A-01',
        classId: class1.id
      },
      {
        name: 'Priya Desai',
        age: 16,
        rollNumber: '10A-02',
        classId: class1.id
      },
      {
        name: 'Amit Patel',
        age: 15,
        rollNumber: '10B-01',
        classId: class2.id
      },
      {
        name: 'Sneha Kulkarni',
        age: 16,
        rollNumber: '10B-02',
        classId: class2.id
      }
    ]);

    console.log('Dummy data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    process.exit(0);
  }
}

seedDatabase();
