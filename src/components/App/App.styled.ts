import styled, {keyframes} from "styled-components";
import backgroundImage from "../../assets/images/galaxy.webp";

const animate = keyframes`
  50% {
    transform: scale(2);
  }
`

export const StyledContainer = styled.main`
  position: relative;
  min-width: 100vw;
  min-height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  z-index: 1;

  &:before {
    position: absolute;
    content: '';
    z-index: -1;
    inset: 0;
    background-size: cover;
    background-image: url(${backgroundImage});
    background-position: center;
    animation-name: ${animate};
    animation-duration: 90s;
    animation-iteration-count: infinite;
  }
`