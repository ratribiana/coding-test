import UserProfilesRoute from '@routes/userProfile.route';
import WelcomeRoute from '@routes/welcome.route';

const routes = [new UserProfilesRoute(), new WelcomeRoute()];

export default routes;
