import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { ContactList } from "../components/Contacts/ContactList";
import { Login } from "../components/Login/Login";
import { selectAuth } from "../store/AuthSlice";

const ProtectedRoute = ({
  children,
  authenticated,
}: PrivateRouteProps): JSX.Element => {
  if (authenticated) return <>{children}</>;
  return <Navigate to={"/login"} />;
};

export const Navigation = (): JSX.Element => {
  const authenticated = useSelector(selectAuth).authenticated;

  return (
    <Routes>
      <Route
        path="/contacts"
        element={
          <ProtectedRoute authenticated={authenticated}>
            <ContactList />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to={"/login"} replace />} />
    </Routes>
  );
};

type PrivateRouteProps = {
  children: JSX.Element;
  authenticated: boolean;
};
