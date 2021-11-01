import styled from 'styled-components';

export const StyledFooter = styled.footer`
  --c1: hsl(30deg, 100%, 50%);
  --c2: hsl(240deg, 100%, 75%);
  --c3: #111;
  --text-color: var(--c1);
  --icon-color: var(--c2);
  --time: 300ms;

  background-image: repeating-linear-gradient(180deg, var(--c3) 0px 3px, #fff0 3px 10px);
  background-size: 10px 10px;
  background-position: center;
`;

export const Wrapper = styled.div`
  --h: 80px;
  --ofsset: 100px;
  position: relative;
  max-width: 1400px;
  width: 100%;
  height: var(--h);
  margin: 0 auto;
  padding: 0 var(--ofsset);

  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 30px;

  @media (max-width: 1000px) {
    --h: 140px;
    --ofsset: 50px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 500px) {
    --ofsset: 20px;
  }
`;

export const Group = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
`;

export const LogoLink = styled.a`
  display: grid;
  grid-template-columns: auto 1fr;
  background-color: var(--c3);
  color: var(--text-color);
  text-decoration: none;
  transition: all var(--time);
  white-space: nowrap;

  &:hover {
    --text-color: var(--c2);
  }

  &.rss {
    width: 200px;
    height: 100%;
    overflow: hidden;
    align-items: center;
    position: relative;
    margin-right: auto;
    padding: 5px 60px 5px 30px;
    &:hover {
      letter-spacing: 2px;
    }

    @media (max-width: 1000px) {
      margin-right: 0;
    }
  }

  &.github {
    height: 40px;
    align-items: center;
    column-gap: 10px;
    padding: 0 20px 0 0;
    border-radius: 20px;
  }
`;

export const Logo = styled.div`
  order: -1;
  fill: var(--text-color);
  transition: all var(--time);

  &.rss {
    height: 40px;
    width: 108px;
  }

  &.github {
    width: 40px;
    height: 40px;
  }
`;

export const LogoText = styled.div`
  display: block;

  &.rss {
    position: absolute;
    left: 138px;
    top: 37%;
    font-size: 27px;
    font-weight: 900;
  }

  &.github {
    font-weight: 300;
  }

  .spoiler {
    @media (max-width: 600px) {
      display: none;
    }
  }
`;
