import React, { useEffect, useState } from "react";
import { useFetch } from "../customHooks/useFetch";

import TeamList from "./TeamListComponent";

import "./TeamComponent.css";
import { IData } from "../../types";

export const TeamComponent = () => {
  const [teamData, setTeamData] = useState<{ name: string; craft: string }[]>(
    []
  );
  const { data, isLoading } = useFetch(
    "http://api.open-notify.org/astros.json"
  );

  const { data: timeData, isLoading: isTimeLoaded } = useFetch(
    "http://api.open-notify.org/iss-now.json"
  );

  const collectTeamData = (data: Pick<IData, "people">) => {
    if (!isLoading) {
      setTeamData(data.people);
    }
  };

  const formatTime = (data?: number) => {
    if (!isTimeLoaded) {
      const dtFormat = new Intl.DateTimeFormat("en-GB", {
        timeStyle: "short",
        timeZone: "UTC",
      });
      return dtFormat.format(new Date(data! * 1000));
    }
  };

  const formatDate = (data?: number) => {
    if (!isTimeLoaded) {
      const dateTimeFormat = new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return dateTimeFormat.format(new Date(data! * 1000));
    }
  };

  useEffect(() => {
    collectTeamData(data!);
  }, [data]);

  return (
    <div className="team-component">
      <div className="date">
        <b>Current UTC time: {formatTime(timeData?.timestamp)}</b>
        <p>{formatDate(timeData?.timestamp)}</p>
      </div>
      <TeamList list={teamData}></TeamList>
    </div>
  );
};
