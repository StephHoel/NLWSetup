export const habitsTable = `CREATE TABLE IF NOT EXISTS habits (
   id TEXT NOT NULL PRIMARY KEY,
   title TEXT NOT NULL,
   created_at DATETIME NOT NULL
)`;

export const habitWeekDaysTable = `CREATE TABLE habit_week_days (
   id TEXT NOT NULL PRIMARY KEY,
   habit_id TEXT NOT NULL,
   week_day INTEGER NOT NULL
)`;

export const habitWeekDaysIndex = `CREATE UNIQUE INDEX habit_week_days_habit_id_week_day_key ON habit_week_days(habit_id, week_day)`;

export const daysTable = `CREATE TABLE days (
   id TEXT NOT NULL PRIMARY KEY,
   date DATETIME NOT NULL
)`;

export const daysIndex = `CREATE UNIQUE INDEX days_date_key ON days(date)`;

export const dayHabitsTable = `CREATE TABLE day_habits (
   id TEXT NOT NULL PRIMARY KEY,
   day_id TEXT NOT NULL,
   habit_id TEXT NOT NULL
)`;

export const dayHabitsIndex = `CREATE UNIQUE INDEX day_habits_day_id_habit_id_key ON day_habits(day_id, habit_id)`;

export const refefineTables = `PRAGMA foreign_keys=OFF;
CREATE TABLE new_day_habits (
   id TEXT NOT NULL PRIMARY KEY,
   day_id TEXT NOT NULL,
   habit_id TEXT NOT NULL,
   CONSTRAINT day_habits_day_id_fkey FOREIGN KEY (day_id) REFERENCES days (id) ON DELETE RESTRICT ON UPDATE CASCADE,
   CONSTRAINT day_habits_habit_id_fkey FOREIGN KEY (habit_id) REFERENCES habits (id) ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO new_day_habits (day_id, habit_id, id) SELECT day_id, habit_id, id FROM day_habits;
DROP TABLE day_habits;
ALTER TABLE new_day_habits RENAME TO day_habits;
CREATE UNIQUE INDEX day_habits_day_id_habit_id_key ON day_habits(day_id, habit_id);
CREATE TABLE new_habit_week_days (
   id TEXT NOT NULL PRIMARY KEY,
   habit_id TEXT NOT NULL,
   week_day INTEGER NOT NULL,
   CONSTRAINT habit_week_days_habit_id_fkey FOREIGN KEY (habit_id) REFERENCES habits (id) ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO new_habit_week_days (habit_id, id, week_day) SELECT habit_id, id, week_day FROM habit_week_days;
DROP TABLE habit_week_days;
ALTER TABLE new_habit_week_days RENAME TO habit_week_days;
CREATE UNIQUE INDEX habit_week_days_habit_id_week_day_key ON habit_week_days(habit_id, week_day);
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;`;