import mongoose from 'mongoose';

// Test the connection to the database
export async function testConnection() {
    try {
        await connect();
        await disconnect();
        console.log('Database connection test was successful (connect + disconnect)');
    }
    catch (error) {
        console.log('Error testing database connection. Error: ' + error);
    }
}

// Connect to the database
export async function connect() {
    try {
        const dbUri = process.env.DBHOST_LOCAL || process.env.DBHOST;
        const dbName = process.env.DB_NAME || 'webshop';

        if (!dbUri) {
            throw new Error('No DB connection string found.');
        }

        await mongoose.connect(dbUri, { dbName });

        // Ping the DB to confirm connection
        if (mongoose.connection.db) {
            await mongoose.connection.db.admin().command({ ping: 1 });
            console.log(`✅ Connected to MongoDB (${dbUri.includes('localhost') ? 'Local' : 'Remote'}) - DB: ${dbName}`);
        } else {
            throw new Error('Database connection is not established');
        }
    } catch (error) {
        console.log('❌ DB Connection Error:', error);
    }
}

// Disconnect from the database
export async function disconnect() {
    try {
        await mongoose.disconnect();
        //console.log('Connection closed');
    }
    catch (error) {
        console.log('Error closing database connection. Error: ' + error);
    }
}