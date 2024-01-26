import { Box, Card, CardContent, Typography } from "@mui/material";
import { projectsData } from "../../data/data";

export default function ProjectsCard() {
  return (
    <Card sx={{ p: 0 }}>
      <CardContent sx={{ p: 0 }}>
        <Typography
          variant="h4"
          gutterBottom
          paddingBlockStart={3}
          paddingInlineStart={4}
        >
          Projects
        </Typography>
        <Box display={"flex"} overflow={"scroll"} gap={2} px={4}>
          {projectsData.map((project) => (
            <Box
              key={project.title}
              flexBasis={420}
              flexShrink={0}
              display={"flex"}
              borderRadius={"10px"}
              my={1}
              overflow={"hidden"}
              className={"project-card"}
            >
              <Box
                width={150}
                height={150}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                overflow={"hidden"}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  width={"100%"}
                  height={"100%"}
                />
              </Box>
              <Box display={"flex"} flexDirection={"column"} p={2}>
                <Typography fontSize={"small"} fontStyle={"italic"}>
                  {project.tags}
                </Typography>
                <Typography fontWeight={"bold"}>{project.title}</Typography>
                <Typography fontSize={"small"}>{project.createdAt}</Typography>
                <Typography>{project.description}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
