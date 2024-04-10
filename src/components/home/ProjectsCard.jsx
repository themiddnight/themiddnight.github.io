import { Box, Card, CardContent, Link, Typography, Chip, Divider, Collapse } from "@mui/material";
import { OpenInNew, AccountTreeRounded } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { TransitionGroup } from "react-transition-group";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Image } from "../styled/Image";
import CardHeader from "../elements/CardHeader";
import { convertDate } from "../../utils/utils";
import MoreButtonSection from "../elements/MoreButton";

export default function ProjectsCard({ data }) {
  const theme = useTheme();
  const [isLimit, setIsLimit] = useState(true);
  const [activeData, setActiveData] = useState(data.data.filter(item => item.active));
  const [limitedData, setLimitedData] = useState(activeData.slice(0, data.display_limit));

  useEffect(() => {
    setActiveData(data.data.filter(item => item.active));
  }, [data.data]);

  useEffect(() => {
    setLimitedData(activeData.slice(0, isLimit ? data.display_limit : activeData.length));
  }, [isLimit, activeData, data.display_limit]);

  return (
    <Card>
      <CardContent>
        <CardHeader>
          <AccountTreeRounded fontSize="large" />
          {data.title}
        </CardHeader>

        <Typography fontStyle={"italic"} mb={ data.subtitle ? 2 : 0 }>
          {data.subtitle}
        </Typography>

        {/* List mode */}
        {data.display_mode === 0 && 
        <TransitionGroup
          component={Box}
          display={"flex"}
          flexDirection={"column"}
          gap={{ xs: 2, lg: 0 }}
          mx={{ xs: -1, md: 0 }}
        >
          {limitedData.map((project, index) => (
            <Collapse key={index}>
              {index != 0 && <Divider sx={{ borderColor: { xs: "transparent", lg: "divider" } }}/>}
              <Box
                // flexShrink={0}
                display={"flex"}
                alignItems={"center"}
                flexDirection={{ xs: "column", lg: "row" }}
                borderRadius={"10px"}
                overflow={"hidden"}
                boxShadow={1}
                bgcolor={ theme.palette.mode === "dark" ? { xs: "#44444466", lg: 'transparent' } : { xs: "#eee", lg: "transparent" } }
              >
                <ProjectContent data={project} display_mode={data.display_mode} />
              </Box>
            </Collapse>
          ))}
          <MoreButtonSection
            isLimit={isLimit}
            setIsLimit={setIsLimit}
            data={activeData}
            limit={data.display_limit}
            setLimitedData={setLimitedData}
          />
        </TransitionGroup>
        }

        {/* Scroll mode */}
        {data.display_mode === 1 && 
        <Box
          display={"flex"}
          gap={2}
          px={3}
          py={0}
          mx={-3.3}
          sx={{
            overflowX: "scroll",
            overflowY: "visible",
            scrollSnapType: "x mandatory",
            maskImage: { 
              xs: "none",
              sm: `
                linear-gradient(
                  to right, 
                  transparent, 
                  black 20px, 
                  black calc(100% - 20px), 
                  transparent
                )`,
            },
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
              bgcolor={ theme.palette.mode === "dark" ? "#44444488" : "#eee" }
              sx={{
                display: project.active ? "flex" : "none",
                scrollSnapAlign: { xs: "center", md: "start" },
                scrollSnapStop: "always",
                scrollMarginInlineStart: { xs: 0, md: 26 },
              }}
            >
              <ProjectContent data={project} display_mode={data.display_mode} />
            </Box>
          ))}
        </Box>}

      </CardContent>
    </Card>
  );
}

const ProjectContent = ({ data, display_mode }) => {
  return (
    <>
      {data.image_url && (
        <Box
          width={{ xs: "100%", lg: display_mode === 0 ? 150 : 180 }}
          height={{ xs: 130, lg: display_mode === 0 ? 100 : "auto" }}
          maxHeight={210}
          flexShrink={0}
          position={"relative"}
          overflow={"hidden"}
        >
          <Link
            href={
              data.public_link === "" ? null : data.public_link
            }
            target="_blank"
          >
            {/* {data.public_link && (
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
            )} */}
            <Image
              src={`${data.image_url}`}
              width={"100%"}
              height={"100%"}
              alt={data.title}
              zoomed={data.public_link ? true : false}
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
          {data.tags.join(", ")}
        </Typography>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"baseline"}
          gap={2}
        >
          <Typography 
            component={data.public_link ? Link : "span"}
            href={data.public_link}
            fontSize={20}
            fontWeight={"bold"}
            noWrap
            // paddingBlock={1}
          >
            {data.title}
          </Typography>
          <Typography fontSize={"small"} align="right" flexShrink={0}>
            {convertDate(data.createdAt, false, false)}
          </Typography>
        </Box>
        <Box display={"flex"} flexWrap={"wrap"} gap={1} my={1}>
          {data.links.map((link, index) => (
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
        <Typography>{data.description}</Typography>
      </Box>
    </>
  )
}


ProjectsCard.propTypes = {
  data: PropTypes.object,
};

ProjectContent.propTypes = {
  data: PropTypes.object,
  display_mode: PropTypes.number.isRequired,
};