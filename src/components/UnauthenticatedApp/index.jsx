import { useAuth } from '../../hooks/useAuth';
import './styles.css';

function UnauthenticatedApp() {
    const { login } = useAuth();

    return (
        <>

            <div>
                <button onClick={login} className="login">
                    Enter Chat
                </button>
            </div>
        </>
    );
}

export { UnauthenticatedApp };
