const StaticTableHeaders: React.FC = () => (
  <thead>
    <tr className="grid grid-cols-4 sm:col-span-2 items-center bg-white p-4 hover:bg-gray-100 rounded-lg">
      <td className="py-2 pl-1">Mark</td>
      <td className="py-2 ">Details</td>
      <td className="py-2">Status</td>
      <td className="py-2">Class/Description</td>
    </tr>
  </thead>
);

export default StaticTableHeaders;