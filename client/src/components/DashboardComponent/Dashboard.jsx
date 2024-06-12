import React, { useState } from "react";
import Root from "../RootComponent/Root.jsx";
import PostForm from "../PostFormComponent/PostForm.jsx";
import MainContent from "./contentComponent/dashboardContent.jsx";

const Dashboard = () => {
  return (
    <Root>
      <main>
        <h1>Dashboard</h1>
        <PostForm />
        <MainContent />
      </main>
    </Root>
  );
};

export default Dashboard;
