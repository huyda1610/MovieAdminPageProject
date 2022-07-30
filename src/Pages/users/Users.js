import React, { useEffect, useState } from 'react'
import "./users.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumn } from "../../config/user";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getUserShowing, deleteUser, getAccount } from '../../Slices/user';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Components/loading/Loading';
import toast, { Toaster } from 'react-hot-toast';


const initialValues = {
  taiKhoan: "",
  matKhau: "",
  hoTen: "",
  email: "",
  soDT: "",
  maLoaiNguoiDung: "KhachHang",
}

const Users = () => {
  const [buttonTrigger, setButton]= useState(null);

  const [input, setInput] = useState(initialValues);

  const { user, userIsLoading, userDeleteMessage } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserShowing());
  }, []);

  useEffect(() => {
    setInput(user);
  }, [user]);

  useEffect(() => {
    if (buttonTrigger !== null) {
      if (userDeleteMessage === "Xóa thành công!") {
        toast.success("Delete complete !!!");
        const currentInput = input;
        setInput(currentInput.filter((item) => item.taiKhoan !== buttonTrigger));
        setButton(null);
      } else if (typeof userDeleteMessage === "string") {
        toast.error(`Cannot delete user with error \n ${userDeleteMessage}`);
        setButton(null);
      }      
      if (userDeleteMessage !== null && typeof userDeleteMessage === "object") {
        toast.error("Cannot delete user !!! Please try again");
        setButton(null);
      }
    }
  }, [userDeleteMessage, buttonTrigger, user, input]);

  const handleEdit = (account) => {
    dispatch(getAccount(account));
    navigate(`edit/${account}`);
  };

  const handleDelete = (account) => {
    dispatch(deleteUser(account));
    setButton(account);
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div 
              className="editButton" 
              onClick={() => handleEdit(params.row.taiKhoan)}
            >Details</div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.taiKhoan)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  if (userIsLoading) {
    return <Loading/>;
  }

  return (
    <div className="users">
      <div><Toaster/></div>
      <div className="usersListTitle">
        User
        <Link to="/home/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        getRowId={(row) => Math.random()}
        className="datagrid"
        rows={input || user}
        columns={userColumn.concat(actionColumn)}
        pageSize={12}
        rowsPerPageOptions={[9]}
        checkboxSelection
        rowHeight={50}
        autoHeight
      />
    </div>
  );
};

export default Users;
