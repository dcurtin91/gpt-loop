import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ChatRoom } from '../ChatRoom';

function AuthenticatedApp() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/gpt-loop/" element={<ChatRoom />} />
            </Routes>
        </BrowserRouter>
    );
}

export { AuthenticatedApp };
