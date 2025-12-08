import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_rqzME3iH1ewC@ep-divine-fog-aes01e5o-pooler.c-2.us-east-2.aws.neon.tech/AI_Form-Builder?sslmode=require&channel_binding=require',
  }
});