import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./UserImage.module.css";
import { useUserProvider } from "providers/user/hooks/UserHooks";

const UserImage = ({ showUserImage = true }) => {
  const { actions } = useUserProvider();

  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const userImageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Fun��o para detectar se um clique foi fora da tooltip ou do �cone do usu�rio
    function handleClickOutside(event: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        userImageRef.current &&
        !userImageRef.current.contains(event.target as Node)
      ) {
        setTooltipVisible(false);
      }
    }

    // Adiciona o event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Limpa o event listener ao desmontar
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {showUserImage && (
        <>
          <div
            className={styles["Header-userImage"]}
            ref={userImageRef} // Adiciona a ref ao �cone do usu�rio
            onClick={() => setTooltipVisible(!isTooltipVisible)}
          />
          {isTooltipVisible && (
            <div
              className={styles["Header-tooltip"]}
              ref={tooltipRef} // Adiciona a ref � tooltip
            >
              <Link
                onClick={() => {
                  actions.logoutUser();
                }}
                to="/"
              >
                <FontAwesomeIcon
                  className="faArrowRightFromBracket"
                  icon={faArrowRightFromBracket}
                />
                <span>Sair</span>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserImage;
