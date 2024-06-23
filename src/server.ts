import app from './app'
import seedSuperAdmin from './app/DB'
import config from './app/config'
import mongoose from 'mongoose'
// const mongoose = require('mongoose');

async function main() {
  try {
    // Connect to the mongoose DB
    await mongoose.connect(config.database_url as string)
    // Call to the Super Admin
    seedSuperAdmin()
    // Connect to the server
    app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`)
    })
  } catch (err) {
    console.log(err)
  }
}

main()
