import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import { projectsData } from "../../data/data";
import { GitHub, Language } from "@mui/icons-material";

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
                position={"relative"}
              >
                <Box position={'absolute'} top={10} left={10}>
                  <Language />
                </Box>
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
                <Link href="#">
                  <Stack direction={"row"} spacing={1} alignItems={'center'}>
                    <Typography fontWeight={"bold"}>{project.title}</Typography>
                    <GitHub color={"primary"} fontSize="small" />
                  </Stack>
                </Link>
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
