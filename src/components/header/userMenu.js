import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { removeItem } from "@utils/localStorage";
import { unsetUser } from "@containers/loginPage/actions";

function UserMenu({}) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const logOffUser = () => {
    dispatch(unsetUser());
    removeItem("user");
  };
  return (
    <div className="popover">
      <span className="popover-label--disconnect" onClick={() => logOffUser()}>
        {t("header.label.disconnect")}
      </span>
    </div>
  );
}
export default UserMenu;
