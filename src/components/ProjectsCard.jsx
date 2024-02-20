import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import { projectsData } from "../../data/data";
import { GitHub, OpenInNew, AccountTreeRounded } from "@mui/icons-material";
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
          <AccountTreeRounded fontSize="large" />
          Projects
        </CardHeader>
        
        <Box
          display={"flex"}
          overflow={"scroll"}
          gap={2}
          px={3}
          py={0}
          sx={{ scrollSnapType: "x mandatory" }}
          className={"project-section"}
        >
          {projectsData.map((project, index) => (
            <Box
              key={index}
              flexBasis={{ xs: 300, lg: 500 }}
              flexShrink={0}
              display={"flex"}
              flexDirection={{ xs: "column", lg: "row" }}
              my={'1px'}
              borderRadius={"10px"}
              overflow={"hidden"}
              boxShadow={1}
              className={"project-card"}
              sx={{
                scrollSnapAlign: { xs: "center", sm: "start"},
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
                <Typography fontSize={"small"} fontStyle={"italic"} fontWeight={'light'}>
                  {project.tags}
                </Typography>
                <Link href={project.githublink} target={"_blank"}>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Typography fontWeight={"bold"}>{project.title}</Typography>
                    <GitHub color={"primary"} fontSize="lgall" />
                  </Stack>
                </Link>
                <Typography fontSize={"small"} mb={1}>
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
