import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

function SignUp() {
  const navigate = useNavigate();

  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [childName, setChildName] = useState("");
  const [childDob, setChildDob] = useState("");
  const [childGender, setChildGender] = useState("");

  const [birthWeight, setBirthWeight] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [prematureBirth, setPrematureBirth] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // 👨‍👩‍👧 USER PROFILE (UNCHANGED AS REQUESTED)
      await setDoc(doc(db, "users", uid), {
        parent: { parentName, email, phone },
        child: {
          childName,
          childDob,
          childGender,
          birthWeight,
          allergies,
          medicalConditions,
          prematureBirth,
        },
        createdAt: new Date(),
      });

      // 💉 FULL VACCINE SCHEDULE (FIXED)
      const vaccinesRef = collection(db, "users", uid, "vaccines");

      const vaccines = [
        { name: "BCG (TB Protection)", dateOffsetWeeks: 0, status: "Done" },
        { name: "Hepatitis B Birth Dose", dateOffsetWeeks: 0, status: "Done" },
        { name: "Polio 0 (OPV)", dateOffsetWeeks: 0, status: "Done" },

        { name: "DTP 1", dateOffsetWeeks: 6, status: "Upcoming" },
        { name: "Hib 1", dateOffsetWeeks: 6, status: "Upcoming" },
        { name: "Polio 1", dateOffsetWeeks: 6, status: "Upcoming" },
        { name: "PCV 1", dateOffsetWeeks: 6, status: "Upcoming" },
        { name: "Rotavirus 1", dateOffsetWeeks: 6, status: "Upcoming" },

        { name: "DTP 2", dateOffsetWeeks: 10, status: "Upcoming" },
        { name: "Hib 2", dateOffsetWeeks: 10, status: "Upcoming" },
        { name: "Polio 2", dateOffsetWeeks: 10, status: "Upcoming" },
        { name: "PCV 2", dateOffsetWeeks: 10, status: "Upcoming" },
        { name: "Rotavirus 2", dateOffsetWeeks: 10, status: "Upcoming" },

        { name: "DTP 3", dateOffsetWeeks: 14, status: "Upcoming" },
        { name: "Hib 3", dateOffsetWeeks: 14, status: "Upcoming" },
        { name: "Polio 3", dateOffsetWeeks: 14, status: "Upcoming" },
        { name: "PCV 3", dateOffsetWeeks: 14, status: "Upcoming" },

        { name: "Vitamin A", dateOffsetWeeks: 24, status: "Upcoming" },

        { name: "Measles 1", dateOffsetWeeks: 36, status: "Upcoming" },

        { name: "Measles 2", dateOffsetWeeks: 78, status: "Upcoming" },
      ];

      // ✅ SAVE ALL VACCINES (THIS FIXES YOUR BUG)
      for (const v of vaccines) {
        await addDoc(vaccinesRef, {
          name: v.name,
          dateOffsetWeeks: v.dateOffsetWeeks,
          status: v.status,
        });
      }

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <MDBox
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: "linear-gradient(180deg, #050814, #0B1220)",
        p: 2,
      }}
    >
      <MDBox
        width="560px"
        p={4}
        borderRadius="20px"
        sx={{
          backgroundColor: "#F8FAFC",
          boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* TITLE */}
        <MDTypography variant="h4" textAlign="center" sx={{ color: "#0F172A", fontWeight: "800" }}>
          Child Health Registration
        </MDTypography>

        <MDTypography
          variant="caption"
          textAlign="center"
          display="block"
          sx={{ color: "#475569", mb: 3 }}
        >
          Parent & Child Immunisation System
        </MDTypography>

        {/* PARENT */}
        <SectionTitle text="Parent Details" />
        <FormGroup>
          <MDInput
            label="Full Name"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            sx={inputStyle}
          />
          <MDInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={inputStyle}
          />
          <MDInput
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={inputStyle}
          />
          <MDInput
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={inputStyle}
          />
        </FormGroup>

        {/* CHILD */}
        <SectionTitle text="Child Details" />
        <FormGroup>
          <MDInput
            label="Child Name"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            sx={inputStyle}
          />
          <MDInput
            type="date"
            value={childDob}
            onChange={(e) => setChildDob(e.target.value)}
            sx={inputStyle}
          />
          <MDInput
            label="Gender"
            value={childGender}
            onChange={(e) => setChildGender(e.target.value)}
            sx={inputStyle}
          />
        </FormGroup>

        {/* MEDICAL */}
        <SectionTitle text="Medical History" />
        <FormGroup>
          <MDInput
            label="Birth Weight"
            value={birthWeight}
            onChange={(e) => setBirthWeight(e.target.value)}
            sx={inputStyle}
          />
          <MDInput
            label="Allergies"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            sx={inputStyle}
          />
          <MDInput
            label="Conditions"
            value={medicalConditions}
            onChange={(e) => setMedicalConditions(e.target.value)}
            sx={inputStyle}
          />
          <MDInput
            label="Premature Birth (Yes/No)"
            value={prematureBirth}
            onChange={(e) => setPrematureBirth(e.target.value)}
            sx={inputStyle}
          />
        </FormGroup>

        {/* BUTTON */}
        <MDButton
          fullWidth
          onClick={handleRegister}
          sx={{
            mt: 2,
            backgroundColor: "#2563EB",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#1D4ED8" },
          }}
        >
          Create Account
        </MDButton>

        {/* LINK */}
        <MDTypography
          variant="caption"
          textAlign="center"
          display="block"
          mt={2}
          sx={{ color: "#475569", cursor: "pointer" }}
          onClick={() => navigate("/sign-in")}
        >
          Already have an account? Sign in
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

/* HELPERS */
const SectionTitle = ({ text }) => (
  <MDTypography sx={{ color: "#0F172A", fontWeight: "700", mt: 2, mb: 1 }}>{text}</MDTypography>
);

const FormGroup = ({ children }) => (
  <MDBox display="flex" flexDirection="column">
    {children}
  </MDBox>
);

const inputStyle = {
  mb: 2,
  "& .MuiInputBase-root": {
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
  },
  "& .MuiInputLabel-root": {
    color: "#64748B",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#CBD5E1",
    },
    "&:hover fieldset": {
      borderColor: "#2563EB",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2563EB",
    },
  },
};

export default SignUp;
