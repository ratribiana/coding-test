import { Router } from 'express';
import UserProfilesController from '@controllers/userProfile.controller';
import { CreateUserProfileDto } from '@dtos/userProfiles.dto';
import { IRoutes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UserProfilesRoute implements IRoutes {
  public router = Router();
  public userProfilesController = new UserProfilesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/v1/profile/`, this.userProfilesController.getAllProfiles);
    this.router.get(`/v1/profile/:id`, this.userProfilesController.getProfileById);
    this.router.post(`/v1/profile`, validationMiddleware(CreateUserProfileDto, 'body'), this.userProfilesController.createProfile);
    this.router.put(`/v1/profile`, validationMiddleware(CreateUserProfileDto, 'body', true), this.userProfilesController.updateUserProfile);
    this.router.delete(`/v1/profile/:id`, this.userProfilesController.deleteUserProfile);
  }
}

export default UserProfilesRoute;
