import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const handleCoordinatorClick = () => {
        navigate('/coordinator');
    };
    const handleParticipantClick = () => {
        navigate('/participant');
    };

    return (
        <div>
            <button onClick={handleCoordinatorClick}>Create a Meeting (Coordinator)</button>
            <button onClick={handleParticipantClick}>Join a Meeting (Participant)</button>
        </div>

    )
        ;
}

export default LoginPage;
