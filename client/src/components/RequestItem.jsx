import React from "react";

const RequestItem = ({ data, index }) => {
  return (
    <>
      <tr className="border-b odd:bg-white even:bg-gray-100 border-gray-50">
        <td className="py-4 px-6 text-sm">{++index}</td>
        <td className="py-4 px-6 text-sm">{data.userId.name}</td>
        <td className="py-4 px-6 text-sm whitespace-nowrap">{data.type}</td>
        <td className="py-4 px-6 text-sm whitespace-nowrap">{data.status}</td>
      </tr>
    </>
  );
};

export default RequestItem;
