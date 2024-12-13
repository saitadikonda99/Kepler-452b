"use client"
import React, { useState } from 'react';
import Dashboard from '../../dashboard/dashboard';
import Loading from '../../../../animation/Loading';
import { toast } from 'react-hot-toast';
import * as XLSX from 'xlsx';
import './page.css';


const DownloadData = () => {
  const [loading, setLoading] = useState(false);

  const formatCourseInfo = (codes, names, years, semesters) => {
    if (!codes) return 'N/A';
    
    const codeArray = codes.split(',');
    const nameArray = names.split(',');
    const yearArray = years.split(',');
    const semesterArray = semesters.split(',');
    
    return codeArray.map((code, index) => 
      `${code} - ${nameArray[index] || ''} (${yearArray[index] || ''} ${semesterArray[index] || ''})`
    ).join('; ');
  };

  const downloadExcel = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/downloadStudents');
      const data = await response.json();

      if (!data.users || data.users.length === 0) {
        toast.error('No data available to download');
        return;
      }

      // Format data for Excel
      const excelData = data.users.map(student => ({
        'ID Number': student.id_number,
        'Name': student.user_name,
        'Email': student.email,
        'Phone Number': student.phone_number || 'N/A',
        'Branch': student.branch || 'N/A',
        'Gender': student.gender || 'N/A',
        'Residency': student.residency || 'N/A',
        'Hostel Name': student.hostel_name || 'N/A',
        'Bus Route': student.bus_route || 'N/A',
        'Country': student.country || 'N/A',
        'State': student.state || 'N/A',
        'District': student.district || 'N/A',
        'Pincode': student.pincode || 'N/A',
        'Club': student.club_name || 'N/A',
        'Domain': student.domain || 'N/A',
        'ERP Reference': student.erp_reference_number || 'N/A',
        'Payment Status': student.payment_status || 'Unpaid',
        'Registration Date': new Date(student.registration_date).toLocaleDateString(),
        'Registered Courses': formatCourseInfo(
          student.course_codes, 
          student.course_names, 
          student.academic_years, 
          student.semesters
        )
      }));

      // Create workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(excelData);

      // Auto-size columns
      const maxWidth = 50;
      const colWidths = {};
      excelData.forEach(row => {
        Object.keys(row).forEach(key => {
          const value = row[key] ? row[key].toString() : '';
          colWidths[key] = Math.min(
            maxWidth,
            Math.max(colWidths[key] || 0, value.length + 2)
          );
        });
      });

      worksheet['!cols'] = Object.values(colWidths).map(width => ({ width }));

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

      // Generate Excel file
      const currentDate = new Date().toISOString().split('T')[0];
      XLSX.writeFile(workbook, `Students_Data_${currentDate}.xlsx`);

      toast.success('Data downloaded successfully');
    } catch (error) {
      console.error('Error downloading data:', error);
      toast.error('Error downloading data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard>
      <div className="DownloadComponent">
        <div className="DownloadComponent-in">
          <h1>Download Student Data</h1>
          <div className="download-section">
            <p>Download complete student registration data in Excel format.</p>
            <button 
              className="download-btn"
              onClick={downloadExcel}
              disabled={loading}
            >
              {loading ? 'Downloading...' : 'Download Excel'}
            </button>
          </div>
          {loading && <Loading />}
        </div>
      </div>
    </Dashboard>
  );
};

export default DownloadData;