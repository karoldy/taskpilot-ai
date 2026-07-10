import { useRef, useState, useEffect } from 'react';
import tokens from '@/tokens/base';
import { typography } from "@/tokens/style";
import { useTranslation } from 'react-i18next';
import { FolderOpenDot } from 'lucide-react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Header from '@/components/layouts/Header';
import Filterbar from '@/components/layouts/Filterbar';
import FilterCard from '@/components/molecules/FilterCard';

export default function ProjectLandingPage() {
  const { t, i18n } = useTranslation();

  const filterBar = useRef<HTMLDivElement>(null);
  const [filterBarHeight, setFilterBarHeight] = useState<number>(
    () => 32
  );

  useEffect(() => {
    setTimeout(() => {
      const el = document.getElementById("project-filter-bar");
      setFilterBarHeight(el?.offsetHeight ?? 64);
    }, 300);

    const handleResize = () => {
      const bar = document.getElementById("project-filter-bar");
      if (bar) {
        setFilterBarHeight(bar?.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("reset", handleResize);
    };
  }, [i18n.language, filterBar.current?.clientHeight]);

  return (
    <>
      <Header
        sx={{
          paddingBottom: `${filterBarHeight / 2}px`,
          transition: "all 0.2s ease-in-out",
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            gap: tokens.spaceGeneralGapS,
            paddingBlock: tokens.spaceGobalScale24,
            paddingInline: tokens.spaceComponentNavPaddingXXl,
            overflow: "hidden",
            flexDirection: {
              xs: 'column',
              md: 'row'
            },
            alignItems: {
              md: 'unset',
              lg: 'center'
            }
          }}
        >
          <Stack
            sx={{
              gap: tokens.spaceGeneralGapXs
            }}
          >
            <Typography
              sx={{
                ...typography.heading1,
                color: tokens.colorTextOnColor
              }}
            >
              {t("project.title")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: tokens.spaceGeneralGapS,
                alignItems: "center"
              }}
            >
              <FolderOpenDot
                color={tokens.colorIconOnColor}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: 'center'
                }}
              >
                <Typography
                  sx={{
                    ...typography.body1,
                    color: tokens.colorTextOnColor
                  }}
                >
                  {t('project.summary_pre')}
                </Typography>
                <span>&nbsp;</span>
                <Typography
                  sx={{
                    ...typography.body1Highlight,
                    color: tokens.colorTextOnColor
                  }}
                >
                  {t("project.summary", { '0': 1 })}
                </Typography>
                <span>&nbsp;</span>
                <Typography
                  sx={{
                    ...typography.body1,
                    color: tokens.colorTextOnColor
                  }}
                >
                  {t('project.summary_end')}
                </Typography>
              </Box>
            </Box>
          </Stack>
          <Box
            sx={{
              display: "flex",
              gap: tokens.spaceGeneralGapM,
              overflow: "auto"
            }}
          >
            <FilterCard
              borderImageSource="linear-gradient(270deg, rgba(147, 215, 217, 0) 0%, #93D7D9 98.4%, rgba(147, 215, 217, 0) 77.79%)"
            />
            <FilterCard
              borderImageSource="linear-gradient(270deg, rgba(225, 21, 28, 0) 0%, #E1151C 98.4%, rgba(225, 21, 28, 0) 77.79%)"
            />
            {/* <PageHeaderCard
              count={overviewData?.data?.active || 0}
              primary={statusFilter === true}
              borderImageSource="linear-gradient(270deg, rgba(147, 215, 217, 0) 0%, #93D7D9 98.4%, rgba(147, 215, 217, 0) 77.79%)"
              onClick={() =>
                setStatusFilter(statusFilter === true ? null : true)
              }
            >
              <StaffBadge status={true} />
            </PageHeaderCard> */}
            {/* <PageHeaderCard
              count={overviewData?.data?.inactive || 0}
              primary={statusFilter === false}
              borderImageSource="linear-gradient(270deg, rgba(225, 21, 28, 0) 0%, #E1151C 98.4%, rgba(225, 21, 28, 0) 77.79%)"
              onClick={() =>
                setStatusFilter(statusFilter === false ? null : false)
              }
            >
              <StaffBadge status={false} />
            </PageHeaderCard> */}
          </Box>
        </Box>
        <Filterbar
          id="project-filter-bar"
          ref={filterBar}
          sx={{
            transform: `translateY(${filterBarHeight / 2}px)`,
            transition: "all 0.2s ease-in-out",
          }}
        >
          
        </Filterbar>
      </Header>
      <div
        style={{
          height: `${filterBarHeight / 2}px`,
          transition: "all 0.2s ease-in-out",
        }}
      />
      <Stack
        sx={{
          flexGrow: 1
        }}
      >
        项目
      </Stack>
    </>
  );
}
