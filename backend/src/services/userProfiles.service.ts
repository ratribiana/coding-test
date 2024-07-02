import { CreateUserProfileDto } from '@dtos/userProfiles.dto';
import { HttpException } from '@exceptions/HttpException';
import { IUserProfile } from '@interfaces/userProfiles.interface';
import userProfileModel from '@models/userProfiles.model';
import { isEmpty, base64toString } from '@utils/functions';

class UserProfileService {
  public userProfiles = userProfileModel;

  public async findAllUserProfiles(): Promise<IUserProfile[]> {
    const profiles: IUserProfile[] = await this.userProfiles.find();
    return profiles;
  }

  public async findUserProfileById(userProfileId: string, filter: Record<string, any> | string): Promise<IUserProfile> {
    if (isEmpty(userProfileId)) throw new HttpException(400, 'UserProfileId is empty');

    const profile: IUserProfile = await this.userProfiles.findById(base64toString(userProfileId)).select(filter);
    if (!profile) throw new HttpException(409, "UserProfile doesn't exist");

    return profile;
  }

  public async createProfile(userProfileData: CreateUserProfileDto): Promise<Partial<IUserProfile>> {
    if (isEmpty(userProfileData)) throw new HttpException(400, 'User Profile data is empty');

    const profile: IUserProfile = await this.userProfiles.findOne({
      email: userProfileData.email,
    });
    if (profile) throw new HttpException(409, `This email ${userProfileData.email} already exists`);

    const createProfileData: IUserProfile = await this.userProfiles.create(userProfileData);

    return createProfileData;
  }

  public async updateUserProfile(userProfileId: string, userProfileData: CreateUserProfileDto): Promise<IUserProfile> {
    if (isEmpty(userProfileData)) throw new HttpException(400, 'userProfileData is empty');

    if (userProfileData.email) {
      const findUserProfile: IUserProfile = await this.userProfiles.findOne({
        email: userProfileData.email,
      });
      if (findUserProfile && findUserProfile._id != base64toString(userProfileId))
        throw new HttpException(409, `The email ${userProfileData.email} already exists`);
    }

    const profile: IUserProfile = await this.userProfiles.findByIdAndUpdate(base64toString(userProfileId), { userProfileData });

    if (!profile) throw new HttpException(409, "UserProfile doesn't exist");

    return profile;
  }

  public async deleteUserProfileById(userProfileId: string): Promise<IUserProfile> {
    const profile: IUserProfile = await this.userProfiles.findByIdAndDelete(base64toString(userProfileId));
    if (!profile) throw new HttpException(409, "UserProfile doesn't exist");

    return profile;
  }
}

export default UserProfileService;
