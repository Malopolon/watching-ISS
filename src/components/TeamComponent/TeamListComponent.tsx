import React, { useEffect, useState } from "react";

const TeamList = ({ list }: { list: { name: string; craft: string }[] }) => {
  const [teamList, setTeamList] = useState<{ name: string; craft: string }[]>(
    []
  );

  useEffect(() => {
    if (list) {
      setTeamList(list);
    }
  }, [list]);

  return (
    <>
      <ul>
        {teamList.map((data, index) =>
          data.craft === "ISS" ? <li key={index}>{data.name}</li> : null
        )}
      </ul>
      <div className="team-amount-container col-12">
        Total amount: {teamList.filter((data) => data.craft === "ISS").length}{" "}
        people on ISS
      </div>
    </>
  );
};

export default TeamList;
