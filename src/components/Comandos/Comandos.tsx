import { StyledContainer, StyledContent, StyledText, StyledRuleWrapper, StyledClose } from "./Comandos.styled";
import rightClick from '../../assets/images/right-click.png';
import leftClick from '../../assets/images/left-click.png';
import { ClickAwayListener, Fade } from "@mui/material";

const Rules = (props: any) => {
  const { closeModal } = props;

  return (
    <Fade in={true}>
      <StyledContainer>
        <ClickAwayListener onClickAway={closeModal}>
          <StyledContent>
            <StyledClose onClick={closeModal}></StyledClose>
            <StyledText>Comandos</StyledText>
              <StyledRuleWrapper>
                <img src={leftClick}></img>
                Segure e arraste para posicionar.
              </StyledRuleWrapper>
              <StyledRuleWrapper>
                <img src={rightClick}></img>
                Clique para rotacionar.
              </StyledRuleWrapper>
              <StyledRuleWrapper>
                <img src={leftClick}></img>
                Clique para atirar nos quadrados.
              </StyledRuleWrapper>
          </StyledContent>
        </ClickAwayListener>
      </StyledContainer>
    </Fade>
  )
}

export default Rules;