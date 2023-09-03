-- DropForeignKey
ALTER TABLE "UsersOnTeam" DROP CONSTRAINT "UsersOnTeam_userId_fkey";

-- DropForeignKey
ALTER TABLE "processes" DROP CONSTRAINT "processes_team_id_fkey";

-- DropForeignKey
ALTER TABLE "processes" DROP CONSTRAINT "processes_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sub_processes" DROP CONSTRAINT "sub_processes_process_id_fkey";

-- AddForeignKey
ALTER TABLE "UsersOnTeam" ADD CONSTRAINT "UsersOnTeam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processes" ADD CONSTRAINT "processes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processes" ADD CONSTRAINT "processes_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_processes" ADD CONSTRAINT "sub_processes_process_id_fkey" FOREIGN KEY ("process_id") REFERENCES "processes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
