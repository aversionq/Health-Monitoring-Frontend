import logoIcon from '../../images/logo.png';
import profileIcon from '../../images/account.png';
import dataIcon from '../../images/cells.png';
import chatIcon from '../../images/sidebar_chat_icon.png';
import analysisIcon from '../../images/sidebar_analysis_icon.png';
import settingsIcon from '../../images/sidebar_settings_icon.png';
import logoutIcon from '../../images/sidebar_logout_icon.png';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/auth';
import { useDispatch } from 'react-redux';

function Sidebar() {
  const sidebarNav = useNavigate();
  const dispatch = useDispatch();

  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.setItem('jwt', '');
    sidebarNav('/');
  };

  return (
    <aside class="flex basis-32 2xl:basis-24 flex-col sm:flex-col bg-white items-center">
      <div class="mobile-sidebar">
        <div class="mainlogo">
          <div
            class="mainlogo__img sm:pt-4 pt-14 sm:pb-8 pb-20 2xl:pb-9"
            onClick={() => sidebarNav('/profile')}>
            <img
              class="object-cover h-20 w-20 2xl:h-14 2xl:w-14"
              src={logoIcon}
              alt="logo icon"></img>
          </div>
        </div>
      </div>
      <div class="mobile-sidebar-icons sm:flex sm:flex-row sm:gap-6">
        <div class="profile">
          <div class="profile__img pb-14 2xl:pb-9" onClick={() => sidebarNav('/profile')}>
            <img
              class="object-cover h-14 w-14 2xl:h-8 2xl:w-8"
              src={profileIcon}
              alt="profile icon"></img>
          </div>
        </div>
        <div class="fulldata">
          <div class="fulldata__img pb-14 2xl:pb-9" onClick={() => sidebarNav('/fulldata')}>
            <img
              class="object-cover h-14 w-14 2xl:h-8 2xl:w-8"
              src={dataIcon}
              alt="data icon"></img>
          </div>
        </div>
        <div class="doctorchat">
          <div class="doctorchat__img pb-14 2xl:pb-9" onClick={() => sidebarNav('/chat')}>
            <img
              class="object-cover h-14 w-14 2xl:h-8 2xl:w-8"
              src={chatIcon}
              alt="chat icon"></img>
          </div>
        </div>
        <div class="analysis">
          <div class="analysis__img pb-14 2xl:pb-9" onClick={() => sidebarNav('/analysis')}>
            <img
              class="object-cover h-14 w-14 2xl:h-8 2xl:w-8"
              src={analysisIcon}
              alt="analysis icon"></img>
          </div>
        </div>
        <div class="settings">
          <div class="settings__img pb-14 2xl:pb-9" onClick={() => sidebarNav('/settings')}>
            <img
              class="object-cover h-14 w-14 2xl:h-8 2xl:w-8"
              src={settingsIcon}
              alt="settings icon"></img>
          </div>
        </div>
        <div class="logout">
          <div class="logout__img">
            <img
              class="object-cover h-14 w-14 2xl:h-8 2xl:w-8"
              src={logoutIcon}
              onClick={() => onClickLogout()}
              alt="logout icon"></img>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
