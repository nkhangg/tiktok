import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { Img } from '../image';

interface AccountProps {
    nickname: string;
    fullname: string;
    image: string;
    tick?: boolean;
}

const Account = ({ nickname, fullname, image, tick }: AccountProps) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/@${nickname}`)}
            className="h-[60px] px-4 py-[9px] flex items-center cursor-pointer gap-4 hover:bg-[rgba(22,24,35,0.03)] select-none"
        >
            <div className="overflow-hidden h-[40px] w-[40px] rounded-full">
                <Img className="w-full h-full object-cover" src={image} alt={nickname} />
            </div>
            <div className="flex flex-col">
                <span className="flex gap-2 text-[16px] font-[600]">
                    <span>{nickname}</span>
                    {tick && (
                        <span className="text-[rgba(32,213,236,1)]">
                            <FontAwesomeIcon icon={faCircleCheck} />
                        </span>
                    )}
                </span>
                <span className="font-[400] text-[14px]">{fullname}</span>
            </div>
        </div>
    );
};

export default Account;
