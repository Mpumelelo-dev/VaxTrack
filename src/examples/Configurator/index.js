import { useState } from "react";

// MUI
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";

// Material Dashboard
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const COLORS = {
  bg: "#0B1220",
  header: "#0F1A30",
  surface: "#111A2E",
  input: "#16213A",
  border: "rgba(255,255,255,0.12)",
  primary: "#4DA3FF",
};

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I’m your child’s vaccination assistant." },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setOpen(!open);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };

    const botReply = {
      from: "bot",
      text: "💉 Next vaccine reminder is set 2 days before due date.",
    };

    setMessages([...messages, userMessage, botReply]);
    setInput("");
  };

  return (
    <>
      {/* FLOATING BUTTON (UPDATED COLORS) */}
      <MDBox position="fixed" bottom="22px" right="22px" zIndex={1000}>
        <IconButton
          onClick={toggleChat}
          sx={{
            backgroundColor: "#BFE3FF", // light blue
            width: 62,
            height: 62,
            border: "2px solid #4DA3FF",
            boxShadow: "0 0 18px rgba(77,163,255,0.25)",
            "&:hover": {
              backgroundColor: "#A9DAFF",
              boxShadow: "0 0 25px rgba(77,163,255,0.4)",
            },
          }}
        >
          <Icon sx={{ color: "#E53935" }}>smart_toy</Icon>
        </IconButton>
      </MDBox>

      {/* CHAT WINDOW */}
      {open && (
        <MDBox
          position="fixed"
          bottom="95px"
          right="22px"
          width="360px"
          height="480px"
          bgcolor={COLORS.bg}
          borderRadius="18px"
          boxShadow="0 20px 60px rgba(0,0,0,0.6)"
          border={`1px solid ${COLORS.border}`}
          display="flex"
          flexDirection="column"
          overflow="hidden"
          zIndex={1000}
        >
          {/* HEADER */}
          <MDBox
            sx={{
              background: COLORS.header,
              color: "#FFFFFF",
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <MDTypography variant="h6" sx={{ fontWeight: 600, color: "#FFFFFF" }}>
              🧬 Vaccine AI Assistant
            </MDTypography>

            <Icon
              onClick={toggleChat}
              sx={{
                cursor: "pointer",
                color: "#FFFFFF",
                background: "rgba(255,255,255,0.08)",
                borderRadius: "50%",
                padding: "4px",
                fontSize: "18px",
                "&:hover": {
                  background: "rgba(77,163,255,0.3)",
                  color: "#4DA3FF",
                },
              }}
            >
              close
            </Icon>
          </MDBox>

          {/* MESSAGES */}
          <MDBox flex={1} p={2} overflow="auto" sx={{ background: "#0A0F1C" }}>
            {messages.map((msg, index) => (
              <MDBox
                key={index}
                mb={1.2}
                display="flex"
                justifyContent={msg.from === "user" ? "flex-end" : "flex-start"}
              >
                <MDBox
                  px={2}
                  py={1.2}
                  borderRadius="14px"
                  maxWidth="80%"
                  sx={{
                    background: msg.from === "user" ? "#1F3B63" : "#111A2E",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
                  }}
                >
                  <MDTypography variant="body2" sx={{ fontSize: "0.85rem", color: "#FFFFFF" }}>
                    {msg.text}
                  </MDTypography>
                </MDBox>
              </MDBox>
            ))}
          </MDBox>

          {/* INPUT */}
          <MDBox
            display="flex"
            alignItems="center"
            p={1.2}
            borderTop={`1px solid ${COLORS.border}`}
            bgcolor={COLORS.surface}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Ask about vaccines..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={{
                input: { color: "#fff" },
                backgroundColor: COLORS.input,
                borderRadius: "10px",
                "& fieldset": { border: "none" },
              }}
            />

            <IconButton onClick={sendMessage}>
              <Icon sx={{ color: COLORS.primary }}>send</Icon>
            </IconButton>
          </MDBox>
        </MDBox>
      )}
    </>
  );
}

export default Chatbot;
