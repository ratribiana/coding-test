import { Request, Response } from 'express';
import { CreateUserProfileDto } from '@dtos/userProfiles.dto';
import { IReturn } from '@interfaces/return.interface';
import { IUserProfile } from '@/interfaces/userProfiles.interface';
import userProfileService from '@services/userProfiles.service';

class UserProfilesController {
  public userProfileService = new userProfileService();

  public getAllProfiles = async (req: Request, res: Response) => {
    try {
      const profiles: IUserProfile[] = await this.userProfileService.findAllUserProfiles();

      res.status(200).json({
        data: profiles,
        message: profiles.length ? 'List of all Profiles' : 'No Profile found',
      } as IReturn);
    } catch (error) {
      res.status(409).json({ error: true, message: error.message });
    }
  };

  public getProfileById = async (req: Request, res: Response) => {
    try {
      const userProfileId: string = req.params.id;
      const findOneUserProfileData: IUserProfile = await this.userProfileService.findUserProfileById(userProfileId, '-id');

      res.status(200).json({
        data: findOneUserProfileData,
        message: 'User Profile Successfully Fetch',
      } as IReturn);
    } catch (error) {
      res.status(409).json({ error: true, message: error.message });
    }
  };

  public createProfile = async (req: Request, res: Response) => {
    try {
      const userProfileData: CreateUserProfileDto = req.body;
      const createProfileData: Partial<IUserProfile> = await this.userProfileService.createProfile(userProfileData);

      res.status(201).json({
        data: createProfileData,
        message: 'User Profile Successfully Created',
      } as IReturn);
    } catch (error) {
      res.status(409).json({ error: true, message: error.message });
    }
  };

  public updateUserProfile = async (req: Request, res: Response) => {
    try {
      const userProfileId: string = req.params.id;
      const userProfileData: CreateUserProfileDto = req.body;
      const updateUserProfileData: IUserProfile = await this.userProfileService.updateUserProfile(userProfileId, userProfileData);

      res.status(200).json({
        data: updateUserProfileData,
        message: 'User Profile Successfully Updated',
      } as IReturn);
    } catch (error) {
      res.status(409).json({ error: true, message: error.message });
    }
  };

  public deleteUserProfile = async (req: Request, res: Response) => {
    try {
      const userProfileId: string = req.params.id;
      const deleteUserProfileData: IUserProfile = await this.userProfileService.deleteUserProfileById(userProfileId);

      if (!deleteUserProfileData) {
        res.status(401).json({ error: true, message: `Error deleting User Profile` } as IReturn);
      }

      if (deleteUserProfileData) {
        res.status(200).json({ message: `User Profile with Email ${deleteUserProfileData.email} is Successfully Deleted` } as IReturn);
      }
    } catch (error) {
      res.status(409).json({ error: true, message: error.message } as IReturn);
    }
  };
}

export default UserProfilesController;
