import { DimensionTokens } from './dimension';
import { FontSizeTokens } from './font-size';
import { FontFamilyTokens } from './font-family';
import { FontWeightTokens } from './font-weight';
import { LineHeightTokens } from './line-height';
import { SpaceTokens } from './space';
import { BorderRadiusTokens } from './border-radius';
import { ColorTokens } from './color';
import { ShadowTokens } from './shadow';
import { GradientTokens } from './gradient';
import { TypographyTokens } from './typography';

const tokens = {
  ...DimensionTokens,
  ...FontSizeTokens,
  ...FontFamilyTokens,
  ...FontWeightTokens,
  ...LineHeightTokens,
  ...SpaceTokens,
  ...BorderRadiusTokens,
  ...ColorTokens,
  ...ShadowTokens,
  ...GradientTokens,
  ...TypographyTokens,
};

export default tokens;
