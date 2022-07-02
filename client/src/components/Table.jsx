const Table = ({ children }) => {
  return (
    <div className="flex flex-col mt-2">
      <div className="overflow-x-auto">
        <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md rounded-lg">
            <table className="min-w-full">
              <thead className="bg-gray-100 font-semibold underline">
                <tr>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs tracking-wider text-left text-gray-700 uppercase"
                  ></th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs tracking-wider text-left text-gray-700 uppercase"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className="py-3 px-6 text-xs tracking-wider text-left text-gray-700 uppercase"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs tracking-wider text-gray-700 uppercase"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>{children}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
