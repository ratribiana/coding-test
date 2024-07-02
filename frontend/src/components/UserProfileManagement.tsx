import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { fetchProfiles } from "@/store/userProfiles";
import { IUserProfile } from "@/types/UserProfile";

const UserProfileList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userProfiles, loading, error } = useAppSelector((state) => state.userProfiles);

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center rounded-lg">
          <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
            Loading UserProfiles...
          </div>
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center rounded-lg text-red-500">
          Error: {error}
        </div>
      )}
      <div className="flex justify-center relative overflow-x-auto mt-10">
        <table className="w-[980px] text-sm text-gray-500 dark:text-gray-400 sm:rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Age
              </th>
              <th scope="col" className="px-6 py-3">
                Tags
              </th>
            </tr>
          </thead>
          <tbody>
            {userProfiles.map((profile: IUserProfile) => (
              <tr
                key={profile.id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {profile.name}
                </th>
                <td className="px-6 py-4 text-center">{profile.email}</td>
                <td className="px-6 py-4 text-center">{profile.age}</td>
                <td className="px-6 py-4 text-center">{profile.tags ? profile.tags.join(", ") : ""}</td>
              </tr>
            ))}
            {loading && (
              <tr className="bg-white border-b animate-pulse">
                <td className="px-6 py-4">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5 m-auto"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5 m-auto"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-40 mb-2.5 m-auto"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12 m-auto"></div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfileList;
