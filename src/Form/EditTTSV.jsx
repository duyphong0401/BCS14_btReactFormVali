import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

const EditTTSV = () => {
  const param = useParams();
  const { maSv } = param;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students.find((item) => item.maSv === maSv);

    if (student) {
      setStudentData(student); 
      setLoading(false);
    } else {
      alert(`Không tìm thấy sinh viên có mã ${maSv}!`);
      navigate('/'); 
    }
  }, [maSv, navigate]);

  // Khởi tạo formik
  const formikEdit = useFormik({
    initialValues: studentData || {
      maSv: '',
      hoTen: '',
      soDienThoai: '',
      email: '',
    },
    enableReinitialize: true, 
    validationSchema: Yup.object({
      maSv: Yup.string().required('Mã sinh viên không được để trống'),
      hoTen: Yup.string().required('Họ tên không được để trống'),
      soDienThoai: Yup.string()
        .required('Số điện thoại không được để trống')
        .matches(/^[0-9]+$/, 'Số điện thoại chỉ chứa chữ số'),
      email: Yup.string()
        .required('Email không được để trống')
        .email('Email chưa đúng định dạng'),
    }),
    onSubmit: (values) => {
      const students = JSON.parse(localStorage.getItem('students')) || [];
      const index = students.findIndex((student) => student.maSv === maSv);
  
      if (index !== -1) {
        students[index] = values; 
        localStorage.setItem('students', JSON.stringify(students));
        alert('Cập nhật thành công!');
        navigate('/add-ttsv');
      } else {
        alert('Sinh viên không tồn tại!');
      }
    },
  });

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="bg-dark text-white p-2 text-center">Chỉnh sửa thông tin sinh viên</h2>
      <form onSubmit={formikEdit.handleSubmit} className="mt-3">
        <div className="row">
          <div className="col-6 mb-3">
            <label className="form-label">Mã SV</label>
            <input
              disabled
              type="text"
              className="form-control"
              name="maSv"
              value={formikEdit.values.maSv}
            />
          </div>
          <div className="col-6 mb-3">
            <label className="form-label">Họ tên</label>
            <input
              onChange={formikEdit.handleChange}
              value={formikEdit.values.hoTen}
              type="text"
              className="form-control"
              name="hoTen"
              placeholder="Nhập họ tên"
            />
            {formikEdit.errors.hoTen && formikEdit.touched.hoTen && (
              <p className="text-danger">{formikEdit.errors.hoTen}</p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-6 mb-3">
            <label className="form-label">Số điện thoại</label>
            <input
              onChange={formikEdit.handleChange}
              value={formikEdit.values.soDienThoai}
              type="text"
              className="form-control"
              name="soDienThoai"
              placeholder="Nhập số điện thoại"
            />
            {formikEdit.errors.soDienThoai && formikEdit.touched.soDienThoai && (
              <p className="text-danger">{formikEdit.errors.soDienThoai}</p>
            )}
          </div>
          <div className="col-6 mb-3">
            <label className="form-label">Email</label>
            <input
              onChange={formikEdit.handleChange}
              value={formikEdit.values.email}
              type="email"
              className="form-control"
              name="email"
              placeholder="Nhập email"
            />
            {formikEdit.errors.email && formikEdit.touched.email && (
              <p className="text-danger">{formikEdit.errors.email}</p>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default EditTTSV;
