-- CreateTable
CREATE TABLE "memory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "link" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "memory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "memory_userId_createdAt_idx" ON "memory"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "memory_userId_title_idx" ON "memory"("userId", "title");

-- AddForeignKey
ALTER TABLE "memory" ADD CONSTRAINT "memory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
