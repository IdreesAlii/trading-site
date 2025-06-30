import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome! Please log in or sign up,</h1>
      <button onClick={() => navigate("/dashboard")}>Login</button>
      <button onClick={() => alert("Signup functionality coming soon!")}>Sign Up</button>
    </div>
  );
}


export default Auth