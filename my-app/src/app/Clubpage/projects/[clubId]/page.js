"use client"
import React from "react";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

const page = () => {

  const clubId = useParams().clubId;

  const [projects, setProjects] = React.useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`/api/projects/${clubId}`);

        if (response.status === 200) {
          setProjects(response.data);
        } else {
          toast.error("Failed to fetch stats");
        }
      } catch (error) {
        console.log(error);
        toast.error("Internal server error");
      }
    };

    fetch();
  }, []);

  console.log(projects);

  return (
    <div className="clubProjectsComponent">
      <div className="clubProjectsComponent-in">
          <h1>Club  Projects</h1>
      </div>
    </div>
  );
};

export default page;
