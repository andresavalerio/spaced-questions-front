import { useState, useRef, useEffect } from "react";
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

function Header({ content, showUserImage = true }: { content: string; showUserImage?: boolean }) {    
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const userImageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Função para detectar se um clique foi fora da tooltip ou do ícone do usuário
        function handleClickOutside(event: MouseEvent) {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node) && 
                userImageRef.current && !userImageRef.current.contains(event.target as Node)) {
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
        <div className="Header">
            <div>
                {content}
            </div>

            <div>
                {showUserImage && (
                    <>
                        <div 
                            className="Header-userImage" 
                            ref={userImageRef} // Adiciona a ref ao ícone do usuário
                            onClick={() => setTooltipVisible(!isTooltipVisible)}
                        />
                        {isTooltipVisible && (
                            <div 
                                className="Header-tooltip"
                                ref={tooltipRef} // Adiciona a ref à tooltip
                            >
                                <Link to="/">
                                <FontAwesomeIcon className="faArrowRightFromBracket" icon={faArrowRightFromBracket} />
                                <span>Sair</span>
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;
