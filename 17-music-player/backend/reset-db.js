#!/usr/bin/env node
'use strict';

/**
 * Database Reset and Seed Script
 * Drops database, runs migrations, and seeds sample data
 * Usage: node reset-db.js
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config();
const mysql = require('mysql2/promise');

const DB_NAME = process.env.DB_NAME || 'music_player';
const MIGRATION_FILE = path.join(__dirname, 'database', 'migrations', '001_create_core_schema.sql');
const SEED_FILE = path.join(__dirname, 'database', 'seeds', '001_sample_data.sql');

async function resetDatabase() {
  let connection;

  try {
    console.log('🔄 Starting database reset and seeding...\n');

    // Connect without database selection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true
    });

    console.log('✓ Connected to MySQL server\n');

    // Drop existing database
    console.log('🗑️  Dropping existing database...');
    await connection.query(`DROP DATABASE IF EXISTS ${DB_NAME}`);
    console.log(`✓ Database "${DB_NAME}" dropped\n`);

    // Create new database
    console.log('📦 Creating new database...');
    await connection.query(`CREATE DATABASE ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`✓ Database "${DB_NAME}" created\n`);

    // Select database
    await connection.changeUser({ database: DB_NAME });
    console.log(`✓ Connected to "${DB_NAME}"\n`);

    // Run migrations
    if (!fs.existsSync(MIGRATION_FILE)) {
      throw new Error(`Migration file not found: ${MIGRATION_FILE}`);
    }

    const migrationSql = fs.readFileSync(MIGRATION_FILE, 'utf8');
    console.log('🏗️  Running migrations: 001_create_core_schema.sql');
    await connection.query(migrationSql);
    console.log('✓ Migrations completed\n');

    // Run seeds
    if (!fs.existsSync(SEED_FILE)) {
      throw new Error(`Seed file not found: ${SEED_FILE}`);
    }

    const seedSql = fs.readFileSync(SEED_FILE, 'utf8');
    console.log('🌱 Seeding sample data: 001_sample_data.sql');
    await connection.query(seedSql);
    console.log('✓ Seeding completed\n');

    // Display summary
    console.log('═'.repeat(60));
    console.log('✅ DATABASE RESET AND SEEDING COMPLETED SUCCESSFULLY!\n');
    console.log('📊 Sample Data Summary:');
    console.log('   • Users: 5 (1 admin + 4 regular users)');
    console.log('   • Genres: 10 genres');
    console.log('   • Artists: 10 artists');
    console.log('   • Albums: 20 albums');
    console.log('   • Songs: 39 songs');
    console.log('   • Playlists: 8 playlists');
    console.log('   • Playlist Songs: 40 entries');
    console.log('   • Favorites: 12 songs');
    console.log('   • Song Views: 8 records');
    console.log('   • Recently Played: 8 records');
    console.log('   • Song Likes: 12 records\n');
    console.log('🎵 Ready to use the music player!\n');
    console.log('Test Credentials:');
    console.log('   Admin: admin@example.com / Sohail@123');
    console.log('   User:  john@example.com / Sohail@123\n');
    console.log('═'.repeat(60));

  } catch (error) {
    console.error('❌ Reset failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Ensure MySQL is running');
    console.error('2. Check .env file for correct DB credentials');
    console.error('3. Verify database files exist in database/ directory');
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

resetDatabase();
