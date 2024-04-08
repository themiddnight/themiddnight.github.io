import { Box, Card, CardContent, Link, Typography, Chip } from "@mui/material";
import { OpenInNew, AccountTreeRounded } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";
import { Image } from "../styled/Image";
import CardHeader from "../elements/CardHeader";
import { convertDate } from "../../utils/utils";

export default function ProjectsCard({ data }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        bgcolor: { xs: "transparent", md: theme.components.MuiCard.styleOverrides.root.backgroundColor },
        boxShadow: { xs: 0, md: 3 },
        m: { xs: -2, md: 0 },
      }}
    >
      <CardContent>
        <CardHeader>
          <AccountTreeRounded fontSize="large" />
          {data.title}
        </CardHeader>

        <Typography fontStyle={"italic"} mb={ data.subtitle ? 2 : 0 }>
          {data.subtitle}
        </Typography>

        <Box
          display={"flex"}
          // overflow={"scroll"}
          gap={2}
          px={3}
          py={0}
          mx={-3.3}
          sx={{
            overflowX: "scroll",
            overflowY: "visible",
            scrollSnapType: "x mandatory",
            // maskImage: { 
            //   xs: "none",
            //   sm: `
            //     linear-gradient(
            //       to right, 
            //       transparent, 
            //       black 10px, 
            //       black calc(100% - 10px), 
            //       transparent
            //     )`,
            // },
          }}
        >
          {data.data.map((project, index) => (
            <Box
              key={index}
              flexBasis={{ xs: "98%", lg: 540 }}
              flexShrink={0}
              display={"flex"}
              flexDirection={{ xs: "column", lg: "row" }}
              my={"1px"}
              borderRadius={"10px"}
              overflow={"hidden"}
              boxShadow={1}
              // bgcolor={"#88888833"}
              bgcolor={ theme.palette.mode === "dark" ? { xs: "#111", md: "#44444488" } : { xs: "#fff", md: "#eee" } }
              sx={{
                display: project.active ? "flex" : "none",
                scrollSnapAlign: { xs: "center", md: "start" },
                scrollSnapStop: "always",
                scrollMarginInlineStart: { xs: 0, md: 26 },
              }}
            >
              {project.image_url && (
                <Box
                  width={{ xs: "100%", lg: 180 }}
                  height={{ xs: 150, lg: "auto" }}
                  maxHeight={200}
                  flexShrink={0}
                  position={"relative"}
                  overflow={"hidden"}
                >
                  <Link
                    href={
                      project.public_link === "" ? null : project.public_link
                    }
                    target="_blank"
                  >
                    {project.public_link && (
                      <Box
                        width={40}
                        height={40}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        borderRadius={10}
                        position={"absolute"}
                        bottom={10}
                        right={10}
                        boxShadow={2}
                        className={"basic-bg"}
                        zIndex={10}
                        sx={{
                          color: "primary.main",
                          "&:hover": { color: "info.main" },
                        }}
                      >
                        <OpenInNew />
                      </Box>
                    )}
                    <Image
                      src={`${project.image_url}`}
                      width={"100%"}
                      height={"100%"}
                      alt={project.title}
                      zoomed={project.public_link ? true : false}
                    />
                  </Link>
                </Box>
              )}

              <Box p={2} width={"100%"}>
                <Typography
                  fontSize={"small"}
                  fontStyle={"italic"}
                  fontWeight={"light"}
                >
                  {project.tags.join(", ")}
                </Typography>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"baseline"}
                  gap={2}
                >
                  <Typography
                    component={
                      project.image_url
                        ? ""
                        : project.public_link
                        ? Link
                        : "span"
                    }
                    href={project.public_link}
                    fontSize={20}
                    fontWeight={"bold"}
                    // paddingBlock={1}
                  >
                    {project.title}
                  </Typography>
                  <Typography fontSize={"small"} align="right" mb={1}>
                    {convertDate(project.createdAt, false, false)}
                  </Typography>
                </Box>
                <Box display={"flex"} flexWrap={"wrap"} gap={1} mb={1}>
                  {project.links.map((link, index) => (
                    <Chip
                      key={index}
                      component={"a"}
                      clickable
                      label={link.title}
                      href={link.url}
                      target={"_blank"}
                      size="small"
                      // color="primary"
                      icon={<OpenInNew fontSize="small" />}
                      sx={{ px: 0.5 }}
                    />
                  ))}
                </Box>
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
  data: PropTypes.object,
};