import React from 'react';

import { StyledProps } from 'types/styled';

import { Group, LogoLink, LogoSvg, LogoText, StyledFooter, Wrapper } from './footer-style';

const GITHUB_LOGO = './svg/sprite.svg#icon-github';
const RS_SCHOOL_LOGO = './svg/sprite.svg#icon-rs-school-js';
const YEAR = "'21";
const MENTOR = 'dimonwhite';
const STUDENT = 'fronte-finem';

export const Footer = ({ className }: StyledProps): JSX.Element => {
  return (
    <StyledFooter className={className}>
      <Wrapper>
        <LogoLink className="rss" href="https://rs.school/js/">
          <LogoSvg className="rss">
            <use href={RS_SCHOOL_LOGO} />
          </LogoSvg>
          <LogoText className="rss">{YEAR}</LogoText>
        </LogoLink>
        <Group>
          <LogoLink className="github" href="https://github.com/dimonwhite">
            <LogoSvg className="github">
              <use href={GITHUB_LOGO} />
            </LogoSvg>
            <LogoText className="github">
              mentor<span className="spoiler">: {MENTOR}</span>
            </LogoText>
          </LogoLink>
          <LogoLink className="github" href="https://github.com/fronte-finem">
            <LogoSvg className="github">
              <use href={GITHUB_LOGO} />
            </LogoSvg>
            <LogoText className="github">
              student<span className="spoiler">: {STUDENT}</span>
            </LogoText>
          </LogoLink>
        </Group>
      </Wrapper>
    </StyledFooter>
  );
};
