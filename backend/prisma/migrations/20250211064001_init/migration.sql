/*
  Warnings:

  - You are about to drop the `ConnectedPlatform` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlatformAccess` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[platformsConnectedToId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ConnectedPlatform" DROP CONSTRAINT "ConnectedPlatform_userId_fkey";

-- DropForeignKey
ALTER TABLE "PlatformAccess" DROP CONSTRAINT "PlatformAccess_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "platformsConnectedToId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "ConnectedPlatform";

-- DropTable
DROP TABLE "PlatformAccess";

-- CreateTable
CREATE TABLE "PlatformsConnectedTo" (
    "id" TEXT NOT NULL,
    "chrome" BOOLEAN NOT NULL DEFAULT false,
    "firefox" BOOLEAN NOT NULL DEFAULT false,
    "brave" BOOLEAN NOT NULL DEFAULT false,
    "mobile" BOOLEAN NOT NULL DEFAULT false,
    "desktop" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlatformsConnectedTo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWallpaper" (
    "id" TEXT NOT NULL,
    "platformOf" "Platform" NOT NULL,
    "link" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserWallpaper_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_platformsConnectedToId_key" ON "User"("platformsConnectedToId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_platformsConnectedToId_fkey" FOREIGN KEY ("platformsConnectedToId") REFERENCES "PlatformsConnectedTo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWallpaper" ADD CONSTRAINT "UserWallpaper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
