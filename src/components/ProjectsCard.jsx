import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import { GitHub, OpenInNew } from "@mui/icons-material";
import CardHeader from "./elements/CardHeader";
import { PropTypes } from "prop-types";

export default function ProjectsCard({ projectsData }) {
  function convertTimestamp(timestamp) {
    const d = new Date(timestamp);
    const year = d.getFullYear();
    const month = d.toLocaleString("en-US", { month: "long" });
    return `${month} ${year}`;
  }
  return (
    <Card sx={{ p: 0 }}>
      <CardContent sx={{ p: 0 }}>
        <CardHeader
          sx={{
            paddingBlockStart: 3,
            paddingBlockEnd: 1,
            paddingInlineStart: 3,
          }}
        >
          Projects
        </CardHeader>
        <Box
          display={"flex"}
          overflow={"scroll"}
          gap={2}
          px={3}
          sx={{ scrollSnapType: "x mandatory" }}
        >
          {projectsData.map((project, index) => (
            <Box
              key={index}
              flexBasis={{ xs: 300, lg: 500 }}
              flexShrink={0}
              display={"flex"}
              flexDirection={{ xs: "column", lg: "row" }}
              borderRadius={"10px"}
              overflow={"hidden"}
              boxShadow={1}
              className={"project-card"}
              sx={{
                scrollSnapAlign: { xs: "center", sm: "start" },
                scrollSnapStop: "always",
                scrollMarginInlineStart: { xs: 0, sm: 25 },
              }}
            >
              <Box
                width={{ xs: 300, lg: 175 }}
                height={{ xs: 150, lg: 175 }}
                flexShrink={0}
                position={"relative"}
              >
                {project.homepage && (
                  <Link href={project.homepage} target={"_blank"}>
                    <Box
                      width={36}
                      height={36}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      borderRadius={1}
                      position={"absolute"}
                      bottom={10}
                      right={10}
                      boxShadow={2}
                      className={"basic-bg"}
                    >
                      <OpenInNew />
                    </Box>
                  </Link>
                )}
                <img
                  src={`images/projects/${project.image}`}
                  alt={project.title}
                  width={"100%"}
                  height={"100%"}
                  style={{ objectFit: "cover" }}
                />
              </Box>

              <Box p={2}>
                <Typography fontSize={"small"} fontStyle={"italic"}>
                  {project.tags}
                </Typography>
                <Link href={project.html_url} target={"_blank"}>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Typography fontWeight={"bold"}>{project.title}</Typography>
                    <GitHub color={"primary"} fontSize="lgall" />
                  </Stack>
                </Link>
                <Typography fontSize={"small"} fontWeight="light" gutterBottom>
                  {convertTimestamp(project.createdAt)}
                  {convertTimestamp(project.updatedAt) ===
                  convertTimestamp(project.createdAt)
                    ? ""
                    : " - " + convertTimestamp(project.updatedAt)}
                </Typography>
                <Typography>{project.description}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

ProjectsCard.propTypes = {
  projectsData: PropTypes.array.isRequired,
};
