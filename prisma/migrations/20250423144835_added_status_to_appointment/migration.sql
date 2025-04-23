-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_appointments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "doctor_name" TEXT NOT NULL,
    "patient_name" TEXT NOT NULL,
    "total_price_in_cents" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "clinic_id" TEXT,
    "user_id" TEXT,
    CONSTRAINT "appointments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "appointments_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_appointments" ("clinic_id", "createdAt", "doctor_name", "id", "patient_name", "total_price_in_cents", "updatedAt", "user_id") SELECT "clinic_id", "createdAt", "doctor_name", "id", "patient_name", "total_price_in_cents", "updatedAt", "user_id" FROM "appointments";
DROP TABLE "appointments";
ALTER TABLE "new_appointments" RENAME TO "appointments";
CREATE UNIQUE INDEX "appointments_clinic_id_key" ON "appointments"("clinic_id");
CREATE UNIQUE INDEX "appointments_user_id_key" ON "appointments"("user_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
