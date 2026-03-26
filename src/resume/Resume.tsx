import { Box, Stack, Typography } from "@mui/material";

const projects = [
  { label: "this website", href: "https://juliank.im" },
  { label: "scamper lang", href: "https://scamper.cs.grinnell.edu" },
  { label: "systems projects", href: "https://github.com/byebyelabs" },
];

const education = [{ years: "2022–2026", label: "grinnell college" }];

const experience = [
  { years: "future", label: "software engineer @ capital one" },
  {
    years: "current",
    label: "software engineer, programming languages @ slag-plt",
  },
  {
    years: "2025",
    label:
      "teaching assistant, data structures and algorithms @ grinnell college",
  },
  {
    years: "2025",
    label: "research engineer, cs education @ glimmer labs",
  },
  { years: "2024", label: "software engineering intern @ p3+uplift" },
  {
    years: "2023–2025",
    label: "research engineer, virtual reality @ gciel",
  },
];

export function Resume() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "#EBEBEB",
        fontFamily: "monospace",
        p: "5vh 5vw",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "4vh",
      }}
    >
      {/* Header */}
      <Typography
        sx={{
          fontFamily: "monospace",
          fontSize: "2.2vw",
          fontWeight: 700,
          color: "#111",
          borderBottom: "1.5px solid #ccc",
          pb: "2vh",
        }}
      >
        juliank.im
      </Typography>

      {/* Education */}
      <Section label="education">
        {education.map((e) => (
          <Row key={e.years} years={e.years} label={e.label} />
        ))}
      </Section>

      {/* Experience */}
      <Section label="experience">
        {experience.map((e) => (
          <Row key={e.label} years={e.years} label={e.label} />
        ))}
      </Section>

      {/* Projects */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <SectionLabel>projects</SectionLabel>
        <Stack
          direction="row"
          flexWrap="wrap"
          sx={{ mt: "2vh", gap: "2vw", flex: 1 }}
        >
          {projects.map((p) => (
            <Box
              key={p.label}
              component="a"
              href={p.href}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: "3vw",
                flex: 1,
                bgcolor: "#daeeff",
                borderRadius: 3,
                border: "1.5px solid #b8d8f5",
                fontFamily: "monospace",
                fontSize: "1.4vw",
                color: "#1a1a2e",
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.15s ease",
                "&:hover": {
                  bgcolor: "#c5e3ff",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(30,80,180,0.12)",
                },
              }}
            >
              {p.label}
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Box>
      <SectionLabel>{label}</SectionLabel>
      <Stack spacing="1vh" sx={{ mt: "1vh", pl: "2vw" }}>
        {children}
      </Stack>
    </Box>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        fontFamily: "monospace",
        fontSize: "1.6vw",
        fontWeight: 700,
        color: "#111",
      }}
    >
      {children}
    </Typography>
  );
}

function Row({ years, label }: { years: string; label: string }) {
  return (
    <Box sx={{ display: "flex", gap: "2vw", alignItems: "baseline" }}>
      <Typography
        sx={{
          fontFamily: "monospace",
          fontSize: "1.3vw",
          color: "#888",
          minWidth: "8vw",
          flexShrink: 0,
        }}
      >
        {years}
      </Typography>
      <Typography
        sx={{ fontFamily: "monospace", fontSize: "1.3vw", color: "#333" }}
      >
        {label}
      </Typography>
    </Box>
  );
}
