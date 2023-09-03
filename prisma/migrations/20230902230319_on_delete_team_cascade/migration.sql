-- DropForeignKey
ALTER TABLE "UsersOnTeam" DROP CONSTRAINT "UsersOnTeam_teamId_fkey";

-- AddForeignKey
ALTER TABLE "UsersOnTeam" ADD CONSTRAINT "UsersOnTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
