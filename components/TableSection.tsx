import DOMPurify from 'dompurify';
import StaticTableHeaders from '@/components/StaticTable'; // Import the StaticTableHeaders component

interface TableSectionProps {
  data: {
    id: string;
    mark: string;
    current_owner: string;
    current_owner_cleaned: string;
    registration_date: string;
    status_type: string;
    status_date: string;
    renewal_date: string;
    mark_description_description: string | string[];
    mark_identification: string; // String or array
    filing_date: number; // Add this line
    first_use_anywhere_date: number; // Add this line
  }[];
  displayMode: string;
}

const sanitizeHtml = (html: string) => {
  return { __html: DOMPurify.sanitize(html) };
};

export const truncateText = (text: string, wordLimit: number): string => {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
};

const TableSection: React.FC<TableSectionProps> = ({ data, displayMode }) => {
  if (displayMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item) => (
          <div key={item.id} className="bg-white p-4 shadow-lg rounded-lg">
            <div className="flex justify-center items-center border border-gray-300 shadow-lg w-full h-[120px] mb-4 rounded-lg">
              <img src={`https://static.trademarkia.com/images/${item.id}`} alt={item.mark} className="px-3 py-8 " />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-md font-bold">{item.mark_identification}</p>
              <p className="text-sm font-light">{item.current_owner}</p><br />
              <p className="text-md font-bold">{item.id}</p>
              <p className="text-sm font-light">{new Date(Number(item.registration_date) * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
            </div>
            <div>
              {item.status_type === 'registered' ? (
                <>
                  <span className="text-green-500 font-bold flex justify-start items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1 flex justify-start"></span>
                    Live/Registered
                  </span>
                  <p className="text-sm font-semibold flex items-center justify-start gap-1">
                    <span className="text-sm font-light flex items-center justify-center gap-1">on </span>
                    {new Date(item.filing_date * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p><br /><br />
                  <p className="text-sm font-semibold flex items-center justify-start gap-1">
                    <img src='/refresh.png' alt="refresh page" className="w-[15px] h-[12px] flex items-center justify-center" />
                    {new Date(item.first_use_anywhere_date * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                </>
              ) : item.status_type === 'pending' ? (
                <>
                  <span className="text-orange-400 font-bold flex items-center justify-start gap-1">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-1 flex items-center justify-center"></span>
                    Live/Pending
                  </span>
                  <p className="text-xs font-semibold flex items-center justify-start gap-1">
                    <span className="text-xs font-light flex items-center justify-center gap-1">on </span>
                    {new Date(item.filing_date * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p><br /><br />
                </>
              ) : (
                item.status_type
              )}
            </div>
            <div dangerouslySetInnerHTML={sanitizeHtml(
              truncateText(
                Array.isArray(item.mark_description_description)
                  ? item.mark_description_description.join(', ')
                  : item.mark_description_description || '',
                11
              )
            )}></div>
          </div>
        ))}
      </div>
    );
  }

  // Default to list view
  return (
    <div className="grid grid-cols-1 gap-6 sm:w-[400px] md:w-[720px] lg:w-[955px]">
      <StaticTableHeaders />
      {data.map((item) => (
        <div key={item.id} className="grid grid-cols-4 sm:col-span-2 gap-6 items-center bg-white p-4 hover:bg-gray-100 rounded-lg">
          <div className="flex justify-center items-center border border-gray-300 shadow-lg w-[158px] h-[120px]">
            <img src={`https://static.trademarkia.com/images/${item.id}`} alt={item.mark} className="px-3 py-8" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-md font-bold">{item.mark_identification}</p>
            <p className="text-sm font-light">{item.current_owner}</p><br />
            <p className="text-md font-bold">{item.id}</p>
            <p className="text-sm font-light">{new Date(Number(item.registration_date) * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
          </div>
          <div>
            {item.status_type === 'registered' ? (
              <>
                <span className="text-green-500 font-bold flex justify-start items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1 flex justify-start"></span>
                  Live/Registered
                </span>
                <p className="text-sm font-semibold flex items-center justify-start gap-1">
                  <span className="text-sm font-light flex items-center justify-center gap-1">on </span>
                  {new Date(item.filing_date * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </p><br /><br />
              
                <p className="text-sm font-semibold flex items-center justify-start gap-1">
                  <img src='/refresh.png' alt="refresh page" className="w-[15px] h-[12px] flex items-center justify-center" />
                  {new Date(item.first_use_anywhere_date * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </p>
              </>
            ) : item.status_type === 'pending' ? (
              <>
                <span className="text-orange-400 font-bold flex items-center justify-start gap-1">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-1 flex items-center justify-center"></span>
                  Live/Pending
                </span>
                <p className="text-xs font-semibold flex items-center justify-start gap-1">
                  <span className="text-xs font-light flex items-center justify-center gap-1">on </span>
                  {new Date(item.filing_date * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </p><br /><br />
              </>
            ) : (
              item.status_type
            )}
          </div>
          <div dangerouslySetInnerHTML={sanitizeHtml(
            truncateText(
              Array.isArray(item.mark_description_description)
                ? item.mark_description_description.join(', ')
                : item.mark_description_description || '',
              11
            )
          )}></div>
        </div>
      ))}
    </div>
  );
};

export default TableSection;