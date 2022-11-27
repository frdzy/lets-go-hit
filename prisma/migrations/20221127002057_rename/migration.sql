/*
  Warnings:

  - You are about to drop the column `byUserId` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `createdByUserId` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "beginTimestamp" DATETIME NOT NULL,
    "reservationId" TEXT,
    "createdByUserId" TEXT NOT NULL,
    CONSTRAINT "Schedule_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Schedule_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Schedule" ("beginTimestamp", "id", "reservationId", "createdByUserId")
    SELECT "beginTimestamp", "id", "reservationId", "byUserId" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
