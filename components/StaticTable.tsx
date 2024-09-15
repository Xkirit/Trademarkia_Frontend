const StaticTableHeaders: React.FC = () => (
  <thead>
    <tr className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-start bg-white p-4 border-b">
      <th className="py-2 px-2 sm:px-4 text-left text-sm sm:text-base">Mark</th>
      <th className="py-2 px-2 sm:px-4 text-left text-sm sm:text-base">Details</th>
      <th className="py-2 px-2 sm:px-4 text-left text-sm sm:text-base">Status</th>
      <th className="py-2 px-2 sm:px-4 text-left text-sm sm:text-base">Class/Description</th>
    </tr>
  </thead>
);

export default StaticTableHeaders;