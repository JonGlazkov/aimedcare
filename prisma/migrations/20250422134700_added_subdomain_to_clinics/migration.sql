/*
  Warnings:

  - Added the required column `subdomain` to the `clinics` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clinics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "subdomain" TEXT NOT NULL,
    "custom_domain" TEXT,
    "manager_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "clinics_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_clinics" ("address", "created_at", "description", "id", "manager_id", "name", "phone", "updated_at") SELECT "address", "created_at", "description", "id", "manager_id", "name", "phone", "updated_at" FROM "clinics";
DROP TABLE "clinics";
ALTER TABLE "new_clinics" RENAME TO "clinics";
CREATE UNIQUE INDEX "clinics_subdomain_key" ON "clinics"("subdomain");
CREATE UNIQUE INDEX "clinics_custom_domain_key" ON "clinics"("custom_domain");
CREATE UNIQUE INDEX "clinics_manager_id_key" ON "clinics"("manager_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
