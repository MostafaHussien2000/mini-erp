import React, { useEffect, useState } from "react";
import Icons from "./Icons";

function Header({ title = "Dashboard" }) {
  const [notificationsCount, setNotificationsCount] = useState(12);
  const [mailCount, setMailCount] = useState(3);

  const [loggedUser, setLoggedUser] = useState({
    name: "Mohamed Kamal",
    role: "Admin",
    avatar:
      "https://th.bing.com/th/id/OIP.hCfHyL8u8XAbreXuaiTMQgHaHZ?rs=1&pid=ImgDetMain",
  });

  const formatNumber = (num) => (num > 9 ? "9+" : num);

  return (
    <header className="header">
      <h1 className="header__title">{title}</h1>
      <div className="header__info">
        <button className="header__info__mail" onClick={() => setMailCount(0)}>
          {mailCount > 0 && <p className="small">{formatNumber(mailCount)}</p>}
          <Icons.Mail />
        </button>
        <button
          className="header__info__notifications"
          onClick={() => setNotificationsCount(0)}
        >
          {notificationsCount > 0 && (
            <p className="small">{formatNumber(notificationsCount)}</p>
          )}
          <Icons.NotificationsBell />
        </button>
        <button className="header__info__user">
          <div className="header__info__user__avatar">
            <img src={loggedUser.avatar} alt={loggedUser.name} />
          </div>
          <div className="header__info__user__text">
            <p className="header__info__user__text__name">{loggedUser.name}</p>
            <p className="header__info__user__text__role small">
              {loggedUser.role}
            </p>
          </div>
          <div className="header__info__user__icon">
            <Icons.ChevronDown />
          </div>
        </button>
      </div>
    </header>
  );
}

export default Header;
