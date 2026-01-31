import { Navigate } from 'react-router-dom';
import { useContext, type ReactNode } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const auth = useContext(AuthContext);

    if (auth?.isLoading) {
        return <div>Loading...</div>;
    }

    if (!auth?.user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
