#!/usr/bin/env node
'use strict';

/**
 * Database Seeding Script
 * Run this script to populate the database with sample data
 * Usage: node seed.js
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config();
const mysql = require('mysql2/promise');

const SEED_FILE = path.join(__dirname, 'database', 'seeds', '001_sample_data.sql');

async function runSeed() {
  let connection;

  try {
    console.log('🌱 Starting database seeding...\n');

    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'music_player',
      multipleStatements: true
    });

    console.log('✓ Connected to database\n');

    // Read seed file
    if (!fs.existsSync(SEED_FILE)) {
      throw new Error(`Seed file not found: ${SEED_FILE}`);
    }

    const seedSql = fs.readFileSync(SEED_FILE, 'utf8');
    console.log('📝 Executing seed file: 001_sample_data.sql\n');

    // Execute seed SQL
    const results = await connection.query(seedSql);

    // Display results
    console.log('\n✅ Seeding completed successfully!\n');
    console.log('Sample data summary:');
    console.log(`  • Users: Includes admin account (admin@example.com) and 4 regular users`);
    console.log(`  • Genres: 10 genres (Rock, Pop, Hip Hop, Electronic, Jazz, etc.)`);
    console.log(`  • Artists: 10 artists (Beatles, Bowie, Miles Davis, Adele, Kendrick, etc.)`);
    console.log(`  • Albums: 20 albums from various artists`);
    console.log(`  • Songs: 39 songs across all albums`);
    console.log(`  • Playlists: 8 playlists created by users`);
    console.log(`  • Playlist Songs: 40 songs added to playlists`);
    console.log(`  • Favorites: 12 songs marked as favorites`);
    console.log(`  • Song Views: 8 song view records`);
    console.log(`  • Recently Played: 8 recently played entries\n`);
    console.log('🎵 Ready to use the music player!\n');

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

runSeed();
