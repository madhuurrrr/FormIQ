import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const JsonForms = pgTable("json_forms", {
    id: serial("id").primaryKey(),
    jsonorm: text("jsonform").notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull()
});