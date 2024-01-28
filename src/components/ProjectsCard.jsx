import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import { projectsData } from "../../data/data";
import { GitHub, OpenInNew } from "@mui/icons-material";
import CardHeader from "./elements/CardHeader";

export default function ProjectsCard() {
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
              flexBasis={{ xs: 290, sm: 480 }}
              flexShrink={0}
              display={"flex"}
              flexDirection={{ xs: "column", sm: "row" }}
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
                width={{ xs: 290, sm: 175 }}
                height={175}
                flexShrink={0}
                position={"relative"}
              >
                {project.publiclink && (
                  <Link href={project.publiclink} target={"_blank"}>
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
                <Link href={project.githublink} target={"_blank"}>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Typography fontWeight={"bold"}>{project.title}</Typography>
                    <GitHub color={"primary"} fontSize="small" />
                  </Stack>
                </Link>
                <Typography fontSize={"small"} fontWeight="light" gutterBottom>
                  {project.createdAt}
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
