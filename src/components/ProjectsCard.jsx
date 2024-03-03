import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { GitHub, OpenInNew, AccountTreeRounded } from "@mui/icons-material";
import { Image } from "./styled/Image";
import CardHeader from "./elements/CardHeader";

export default function ProjectsCard({ data }) {
  return (
    <Card sx={{ p: 0 }}>
      <CardContent sx={{ p: 0 }}>
        <CardHeader
          sx={{
            paddingBlockStart: "26px",
            paddingInline: "26px",
          }}
        >
          <AccountTreeRounded fontSize="large" />
          Personal Projects
        </CardHeader>
        
        <Box
          display={"flex"}
          overflow={"scroll"}
          gap={2}
          px={3}
          py={0}
          sx={{ 
            scrollSnapType: "x mandatory", 
            maskImage: `
              linear-gradient(
                to right, 
                transparent, 
                black 20px, 
                black calc(100% - 20px), 
                transparent
              )`
          }}
        >
          {data.map((project, index) => (
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
              bgcolor={"#88888833"}
              sx={{
                scrollSnapAlign: { xs: "center", sm: "start"},
                scrollSnapStop: "always",
                scrollMarginInlineStart: { xs: 0, sm: 26 },
              }}
            >
              <Box
                width={{ xs: 300, lg: 175 }}
                height={{ xs: 150, lg: 165 }}
                flexShrink={0}
                position={"relative"}
                overflow={"hidden"}
              >
                <Link href={project.publiclink} target={"_blank"}>
                  {project.publiclink && (
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
                      zIndex={10}
                      sx={{ color: "primary.main", "&:hover": { color: "info.main" } }}
                    >
                      <OpenInNew />
                    </Box>
                  )}
                  <Image
                    src={`images/projects/${project.image}`}
                    alt={project.title}
                    width="100%"
                    height="100%"
                    zoomed={project.publiclink ? true : false}
                  />
                </Link>
              </Box>

              <Box p={2}>
                <Typography fontSize={"small"} fontStyle={"italic"} fontWeight={'light'}>
                  {project.tags}
                </Typography>
                <Link href={project.githublink} target={"_blank"}>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Typography fontWeight={"bold"}>{project.title}</Typography>
                    <GitHub color={"primary"} fontSize="small" />
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

ProjectsCard.propTypes = {
  data: PropTypes.array.isRequired,
};