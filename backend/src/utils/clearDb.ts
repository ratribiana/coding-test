import dotenv from 'dotenv';
import database from '@databases/connection';
import userProfileModel from '@models/userProfiles.model';

dotenv.config({ path: '.env.development' });

(async () => {
  await database.startConnection();

  await userProfileModel.deleteMany();
  console.log('[DATABASE] Users successfully cleared');

  process.exit();
})();
