"use client"
import React from "react";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

const page = () => {

  const clubId = useParams().clubId;

  const [activities, setActivities] = React.useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`/api/activities/${clubId}`);

        if (response.status === 200) {
          setActivities(response.data);
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

  console.log(activities);

  return (
    <div className="clubActivitiesComponent">
      <div className="clubActivitiesComponent-in">
          <h1>Club  Activities</h1>
      </div>
    </div>
  );
};

export default page;
