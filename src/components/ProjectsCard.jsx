import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import { projectsData } from "../../data/data";
import { GitHub, OpenInNew } from "@mui/icons-material";

export default function ProjectsCard() {
  return (
    <Card sx={{ p: 0 }}>
      <CardContent sx={{ p: 0 }}>
        <Typography
          variant="h4"
          gutterBottom
          paddingBlockStart={3}
          paddingInlineStart={3}
        >
          Projects
        </Typography>
        <Box display={"flex"} overflow={"scroll"} gap={2} px={3}>
          {projectsData.map((project, index) => (
            <Box
              key={index}
              flexBasis={420}
              flexShrink={0}
              display={"flex"}
              borderRadius={"10px"}
              my={1}
              overflow={"hidden"}
              boxShadow={1}
              className={"project-card"}
            >
              <Box
                width={150}
                height={150}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                overflow={"hidden"}
                position={"relative"}
              > 
              {project.publiclink && (
                <Link href={project.publiclink} target={'_blank'}>
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

              <Box display={"flex"} flexDirection={"column"} p={2}>
                <Typography fontSize={"small"} fontStyle={"italic"}>
                  {project.tags}
                </Typography>
                <Link href={project.githublink} target={'_blank'}>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Typography fontWeight={"bold"}>{project.title}</Typography>
                    <GitHub color={"primary"} fontSize="small" />
                  </Stack>
                </Link>
                <Typography fontSize={"small"} fontWeight='light'>{project.createdAt}</Typography>
                <Typography>{project.description}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
