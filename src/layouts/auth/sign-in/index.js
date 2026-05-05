import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

// Components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert("Enter email and password");
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <MDBox
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: "#020617", // VERY DARK BACKGROUND
      }}
    >
      <MDBox
        width="420px"
        p={4}
        borderRadius="16px"
        sx={{
          backgroundColor: "#FFFFFF", // WHITE CARD (KEY FIX)
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* TITLE */}
        <MDTypography
          variant="h4"
          sx={{
            color: "#0F172A", // DARK TEXT ON WHITE
            textAlign: "center",
            fontWeight: "700",
            mb: 1,
          }}
        >
          VaxTrack
        </MDTypography>

        <MDTypography
          variant="body2"
          sx={{
            color: "#475569",
            textAlign: "center",
            mb: 3,
          }}
        >
          Sign in to continue
        </MDTypography>

        {/* EMAIL */}
        <MDInput
          fullWidth
          type="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={inputStyle}
        />

        {/* PASSWORD */}
        <MDInput
          fullWidth
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={inputStyle}
        />

        {/* BUTTON */}
        <MDButton
          fullWidth
          onClick={handleLogin}
          sx={{
            mt: 1,
            backgroundColor: "#2563EB",
            color: "#FFFFFF",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#1D4ED8",
            },
          }}
        >
          Sign In
        </MDButton>

        {/* LINK */}
        <MDTypography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "center",
            mt: 2,
            color: "#475569",
            cursor: "pointer",
          }}
          onClick={() => navigate("/sign-up")}
        >
          Don't have an account? Sign up
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

const inputStyle = {
  mb: 2,
  "& .MuiInputBase-root": {
    backgroundColor: "#F8FAFC", // LIGHT INPUT
    color: "#0F172A",
  },
  "& .MuiInputLabel-root": {
    color: "#475569",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#CBD5F5",
    },
    "&:hover fieldset": {
      borderColor: "#2563EB",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2563EB",
    },
  },
};

export default SignIn;
