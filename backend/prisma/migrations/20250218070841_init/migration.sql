-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('EXTENSION', 'MOBILE', 'DESKTOP');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "platformsConnectedToId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatformsConnectedTo" (
    "id" TEXT NOT NULL,
    "extension" BOOLEAN NOT NULL DEFAULT false,
    "mobile" BOOLEAN NOT NULL DEFAULT false,
    "desktop" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlatformsConnectedTo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWallpaper" (
    "id" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
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
