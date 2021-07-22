import React from 'react';

import { SVG_SPRITE_ICON_SRC, SvgIcon } from 'components/svg-icon/svg-icon';
import { StyledProps } from 'types/styled';

import { Group, Logo, LogoLink, LogoText, StyledFooter, Wrapper } from './footer-style';

const GITHUB_LOGO = 'icon-github';
const RS_SCHOOL_LOGO = 'icon-rs-school-js';
const YEAR = "'21";
const MENTOR = 'dimonwhite';
const STUDENT = 'fronte-finem';

const getGithubUrl = (username: string) => `https://github.com/${username}`;

export const Footer = ({ className }: StyledProps): JSX.Element => {
  return (
    <StyledFooter className={className}>
      <Wrapper>
        <LogoLink className="rss" href="https://rs.school/js/">
          <Logo className="rss">
            <SvgIcon src={SVG_SPRITE_ICON_SRC} name={RS_SCHOOL_LOGO} />
          </Logo>
          <LogoText className="rss">{YEAR}</LogoText>
        </LogoLink>
        <Group>
          <LogoLink className="github" href={getGithubUrl(MENTOR)}>
            <Logo className="github">
              <SvgIcon src={SVG_SPRITE_ICON_SRC} name={GITHUB_LOGO} />
            </Logo>
            <LogoText className="github">
              mentor<span className="spoiler">: {MENTOR}</span>
            </LogoText>
          </LogoLink>
          <LogoLink className="github" href={getGithubUrl(STUDENT)}>
            <Logo className="github">
              <SvgIcon src={SVG_SPRITE_ICON_SRC} name={GITHUB_LOGO} />
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
