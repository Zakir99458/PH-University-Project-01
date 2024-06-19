import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  // port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  port: 5000,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  default_password: process.env.DEFAULT_PASS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
}
