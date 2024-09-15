const StaticTableHeaders: React.FC = () => (
  <thead>
    <tr className="grid grid-cols-4 gap-6 items-start bg-white p-4 border-b">
      <td className="py-2 pl-1 pr-14 ">Mark</td>
      <td className="py-2 pr-14 ">Details</td>
      <td className="py-2  pr-14 ">Status</td>
      <td className="py-2  pr-14 ">Class/Description</td>
    </tr>
  </thead>
);

export default StaticTableHeaders;