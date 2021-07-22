import React from 'react';

import { IconName, SVG_SPRITE_ICON_SRC, SvgIcon } from 'components/svg-icon/svg-icon';
import { StyledProps } from 'types/styled';

import { Group, Logo, LogoLink, LogoText, StyledFooter, Wrapper } from './footer-style';

const RS_SCHOOL_URL = 'https://rs.school/js/';
const YEAR = "'21";
const MENTOR = 'dimonwhite';
const STUDENT = 'fronte-finem';

const getGithubUrl = (username: string) => `https://github.com/${username}`;

export const Footer = ({ className }: StyledProps): JSX.Element => {
  return (
    <StyledFooter className={className}>
      <Wrapper>
        <LogoLink className="rss" href={RS_SCHOOL_URL}>
          <Logo className="rss">
            <SvgIcon src={SVG_SPRITE_ICON_SRC} name={IconName.RS_SCHOOL} />
          </Logo>
          <LogoText className="rss">{YEAR}</LogoText>
        </LogoLink>
        <Group>
          <LogoLink className="github" href={getGithubUrl(MENTOR)}>
            <Logo className="github">
              <SvgIcon src={SVG_SPRITE_ICON_SRC} name={IconName.GITHUB} />
            </Logo>
            <LogoText className="github">
              mentor<span className="spoiler">: {MENTOR}</span>
            </LogoText>
          </LogoLink>
          <LogoLink className="github" href={getGithubUrl(STUDENT)}>
            <Logo className="github">
              <SvgIcon src={SVG_SPRITE_ICON_SRC} name={IconName.GITHUB} />
            </Logo>
            <LogoText className="github">
              student<span className="spoiler">: {STUDENT}</span>
            </LogoText>
          </LogoLink>
        </Group>
      </Wrapper>
    </StyledFooter>
  );
};
