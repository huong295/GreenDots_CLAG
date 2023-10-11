import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Modal} from "antd";
import { BellOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from '../auth/AuthContext'
import type { MenuProps } from 'antd';
import { useOrgan } from '../contexts/OrganizerContext';
import OrganizerSignupForm from '../component/form/OrganizerSignupForm/OganizerSignupForm';
import { useNavigate } from 'react-router-dom'; // navigate to another page
import { useState } from "react";
import logoGreenDots from "../assets/logo.svg";


const styles = {
  container: "h-[4em] border-xl flex justify-between border-2",
  nameApp: "text-4xl text-bold",
  navContainer: "flex items-center",
  menuNavbarItem: "flex",
  menuNavbarButton: "px-4 flex space-x-2",
  navBrand: "flex items-center"
}; 

const NavbarHeader = () => {

  const auth = useAuth();
  const navigator = useNavigate();

  const NavigationItem = [
    { name: "Home", path: "/" },
    { name: " AI Tool", path: "/tool" },
    { name: "About us", path: "/about" },
  ];

  const {showOrganizerSignupForm, 
          setShowOrganizerSignupForm,
          organizerID
        } = useOrgan();
  
  const items: MenuProps['items'] = [
    {
      label: (
        <div style={{color: '#33BBC5', fontWeight: 'bold'}}>
        {auth.username}
        </div>
      ),
      key: '0',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      label: (
        
        <Link to={`/profile/${auth.username}`}>
          Profile
        </Link>
      ),
      key: '2',
    },
    {
      label: (
        <button 
          onClick={() => { 
            if (!organizerID) {
              showConfirmModal();
            }
            else {
              navigator(`/organizer/${organizerID}`)
            } 
          }}
        >
          Switch to organizer
        </button>
      ),
      key: '3',
    },
    {
      label: (
        <div style={{color: '#614BC3', fontWeight: '600'}}  onClick={auth.logout}>
          <Link to ={`/`}>Log out</Link>
        </div>
      ),
      key: '4',
    },
  ];

  // Confirm modal
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const showConfirmModal = () => {
      setIsConfirmModalOpen(true);
  };

  const handleConfirmOk = () => {
      setShowOrganizerSignupForm(true);
      setIsConfirmModalOpen(false);
  };

  const handleConfirmCancel = () => {
      setIsConfirmModalOpen(false);
  };

  return (
    <>
    <div className={styles.container}>
      <Link to={"/"} className={styles.navBrand}>
      <div className={styles.nameApp} ><img src={logoGreenDots} alt='GreenDots Logo'/></div>
      </Link>
      <div className={styles.navContainer}>
        <div className={styles.menuNavbarItem} >
          {NavigationItem.map((item, index) => (
            <div key={index}>
              <Link to={item.path} className="hover:text-gray-300 px-4 text-lg">
                {item.name}
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.menuNavbarButton}>
          {/* show log in button when user does not log in */}
          {!auth.isLoggedIn && <button className="rounded-2xl bg-[#FDA172] px-2 text-bold text-black">
            <Link to={"login"}>JOIN US ! </Link>
          </button>}
            {/* show avatar when user logged in */}
          {auth.isLoggedIn && <>
            <Dropdown menu={{ items }} placement="bottom">
              <Avatar shape="circle" icon={<UserOutlined />}></Avatar>
            </Dropdown>
            <div className="">
              <BellOutlined className="text-3xl" />
            </div>
          </>}
        </div>
      </div>
    </div>
    {showOrganizerSignupForm && <OrganizerSignupForm />}
    <Modal 
        centered 
        title = "Do you want to register as an organizer?"
        open={isConfirmModalOpen} 
        onOk={handleConfirmOk} onCancel={handleConfirmCancel}
        width={480}
    >
        <p>You need to be an organizer to perform this action.</p>
    </Modal>
    </>
  );
};

export default NavbarHeader;
