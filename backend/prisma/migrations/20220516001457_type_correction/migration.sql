-- CreateTable
CREATE TABLE "message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT,
    "user" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "userConnected" BOOLEAN
);
