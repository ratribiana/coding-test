import React from "react";
import UserProfileForm from "@/components/UserProfileForm";
import UserProfileManagement from '@/components/UserProfileManagement';
import DataComponent from "@/components/DataComponent";

const Home: React.FC = () => {
 
  return (
    <>
      <h1 className="flex justify-center p-4 text-2xl">User Profile Management</h1>
      <h2 className="flex justify-center p-4 text-xl mt-10">Task 1: User Profiles</h2>
      <UserProfileForm />
      <UserProfileManagement />
      <h2 className="flex justify-center p-4 text-xl mt-10">Task 2: Data table </h2>
      <DataComponent />
    </>
  );
};

export default Home;
