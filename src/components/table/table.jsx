// components/FlexibleTable.js
'use client'
import React from 'react';
import "./table.global.css";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// get current path
import { usePathname } from 'next/navigation';
const FlexibleTable = ({ data, headerNames, onSort }) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  // Lấy danh sách các khóa của đối tượng đầu tiên làm tiêu đề bảng
  const headers = Object.keys(data[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [showFilterInput, setShowFilterInput] = useState(null);
  const rowsPerPage = 10;
  const router = useRouter();
  const pathname = usePathname()
  // Tính toán số lượng trang
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Lấy dữ liệu cho trang hiện tại
  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Xử lý sự kiện khi chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClickEdit = (id) => {
    // Lấy đường dẫn hiện tại
    router.push(`${pathname}/edit/${id}`)
  }
  return (
    <>
   
    <div className='flex justify-center flex-col'>
    <table className='bg-blue mb-2'>
      <thead>
        <tr className='bg-blue-400 text-white'>
          {headerNames.map((header, index) => (
            <th className='p-2 border-2 rounded-md' key={header}>
              {header}
              <span
                className="cursor-pointer"
                onClick={() => onSort(headers[index])}
              >
                ⬆️⬇️
              </span>
            </th>
          ))}
          <th>Chỉnh sửa</th>
        </tr>
      </thead>
      <tbody>
        {currentData.map((row, rowIndex) => (
          <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? 'bg-slate-200' : 'bg-slate-300 text-blue-500'}`}>
            {headers.map((header) => (
              <td  key={header}
              className={`text-center ${header === 'roomStatus' ? (row[header] === 'Sẵn sàng' ? 'text-green-700' : 'text-red-500') : ''}
              
              p-4`}
              >{row[header] === null ? '' : row[header]} {header === 'maxPerson' ? (row[header] > 0 ? 'Người' : ''): ''} 
              {header === 'width' || header === 'height' ? (row[header] > 0 ? 'm^2' : ''): ''}</td>
            ))}
            <td className='text-center'><button onClick={() => handleClickEdit(row.id)}>Edit</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className='flex justify-end'>
      <div className="pagination flex items-center">
          <div className='mr-2'>Trang: </div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
              className='mr-2 p-2 border-2 rounded-md border-black w-10 h-10'
            >
              {`${index + 1}`}
            </button>
          ))}
        </div>
    </div>
    
    </div>
    
    </>
  );
};

export default FlexibleTable;
