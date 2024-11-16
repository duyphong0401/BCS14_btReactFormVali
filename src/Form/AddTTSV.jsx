import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Table } from 'antd';
import { NavLink } from 'react-router-dom';

const AddTTSV = () => {
  const [arrProduct, setArrProduct] = useState([]);

  useEffect(() => {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    setArrProduct(students);
  }, []);

  const updateLocalStorage = (data) => {
    localStorage.setItem('students', JSON.stringify(data));
  };

  const handleDelete = (maSv) => {
    const updatedList = arrProduct.filter((item) => item.maSv !== maSv);
    setArrProduct(updatedList);
    updateLocalStorage(updatedList);
  };

  const dataColumn = [
    {
      title: 'Mã SV',
      dataIndex: 'maSv',
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      filters: [
        { text: 'Nguyễn', value: 'nguyen' },
        { text: 'Lê', value: 'le' },
        { text: 'Trần', value: 'tran' },
      ],
      onFilter: (value, record) => {
        return record.hoTen.toLowerCase().includes(value);
      },
      sorter: (a, b) => a.hoTen.localeCompare(b.hoTen),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDienThoai',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Action',
      render: (text, record) => (
        <>
          <NavLink to={`/edit-ttsv/${record.maSv}`} className="btn btn-primary me-2">
            Cập nhật
          </NavLink>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(record.maSv)}
          >
            Xóa
          </button>
        </>
      ),
    },
  ];

  const formik = useFormik({
    initialValues: {
      maSv: '',
      hoTen: '',
      soDienThoai: '',
      email: '',
    },
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
    onSubmit: (values, { resetForm }) => {
      const updatedList = [...arrProduct, { ...values, key: values.maSv }];
      setArrProduct(updatedList);
      updateLocalStorage(updatedList);
      resetForm();
      alert('Thêm sinh viên thành công!');
    },
  });

  return (
    <div className="container mt-4">
      <h2 className="bg-dark text-white p-2 text-center">Thông tin sinh viên</h2>
      <form onSubmit={formik.handleSubmit} className="mt-3">
        <div className="row">
          <div className="col-6 mb-3">
            <label className="form-label">Mã SV</label>
            <input
              onChange={formik.handleChange}
              value={formik.values.maSv}
              type="text"
              className="form-control"
              name="maSv"
              placeholder="Nhập mã sinh viên"
            />
            {formik.errors.maSv && formik.touched.maSv && (
              <p className="text-danger">{formik.errors.maSv}</p>
            )}
          </div>
          <div className="col-6 mb-3">
            <label className="form-label">Họ tên</label>
            <input
              onChange={formik.handleChange}
              value={formik.values.hoTen}
              type="text"
              className="form-control"
              name="hoTen"
              placeholder="Nhập họ tên"
            />
            {formik.errors.hoTen && formik.touched.hoTen && (
              <p className="text-danger">{formik.errors.hoTen}</p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-6 mb-3">
            <label className="form-label">Số điện thoại</label>
            <input
              onChange={formik.handleChange}
              value={formik.values.soDienThoai}
              type="text"
              className="form-control"
              name="soDienThoai"
              placeholder="Nhập số điện thoại"
            />
            {formik.errors.soDienThoai && formik.touched.soDienThoai && (
              <p className="text-danger">{formik.errors.soDienThoai}</p>
            )}
          </div>
          <div className="col-6 mb-3">
            <label className="form-label">Email</label>
            <input
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              className="form-control"
              name="email"
              placeholder="Nhập email"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Thêm sinh viên
        </button>
      </form>

      <Table
        columns={dataColumn}
        dataSource={arrProduct}
        rowKey="maSv"
        className="mt-4"
      />
    </div>
  );
};

export default AddTTSV;
