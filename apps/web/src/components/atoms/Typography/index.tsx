import React from "react";
import tokens from "@/tokens/base";
import { typography } from "@/tokens/style";
import Typography, { type TypographyProps } from "@mui/material/Typography";

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export interface HighlightTypographyProps extends Omit<TypographyProps, 'children'> {
  search?: string;
  highlight?: boolean;
  highlightColor?: string;
  children?: React.ReactNode;
}

const highlightNode = (regex: RegExp, node?: React.ReactNode, highlightColor?: string): React.ReactNode => {
  if (!node) return null;
  if (typeof node === "string") {
    const parts = node.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <Typography
          key={`${i+1}`}
          component="span"
          sx={{
            ...typography.searchHighlight,
            color: tokens.colorTextHighlight,
            backgroundColor: highlightColor
          }}
        >
          {part}
        </Typography>
      ) : (
        <React.Fragment key={`${i+1}`}>{part}</React.Fragment>
      )
    );
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => <React.Fragment key={`${i+1}`}>{highlightNode(child)}</React.Fragment>);
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return React.cloneElement(node, {
      children: highlightNode(regex, node?.props?.children, highlightColor),
    });
  }

  return node;
};

function HighlightTypography (props: HighlightTypographyProps) {
  const {
    search,
    highlight = false,
    highlightColor,
    children,
    ...rest
  } = props;

  if (!children) return null;

  if (!highlight || !search) {
    return <Typography {...rest}>{children}</Typography>;
  }

  const keywords = search
    ?.trim()
    ?.split(/\s+/)
    ?.filter(Boolean)
    ?.map(escapeRegExp);

  const regex = new RegExp(`(${keywords.join("|")})`, "gi");

  return <Typography {...rest}>{highlightNode(regex, children, highlightColor)}</Typography>;
};

export default React.memo(HighlightTypography);
