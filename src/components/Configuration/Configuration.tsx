import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import {useContext} from "react";
import {Controller, useForm} from "react-hook-form";
import {ConfigurationContext} from "../../contexts/ConfigurationContext";
import {StyledTitle} from "../Game/Game.styled";
import {SliderWrapper, StyledButtonsContainer, StyledContainer, StyledField, StyledLabel, StyledButton} from "./Configuration.styled";
import {Fade} from "@mui/material";
import {useNavigate} from "react-router-dom";
import SaveOutlined from "@mui/icons-material/SaveOutlined"
import ArrowBack from "@mui/icons-material/KeyboardBackspaceOutlined"

const Configuration = () => {
  const navigate = useNavigate();
  const {configuration, saveConfig} = useContext<any>(ConfigurationContext);
  const {control, handleSubmit} = useForm({
    defaultValues: {
      volumeMusic: configuration.volumeMusic || 0,
      volumeEffects: configuration.volumeEffects || 0,
    },
  });

  console.log(control);

  function onSubmit(data: any) {
    saveConfig(data);
  }

  function navigateBack(){
    navigate('../');
  }

  return (
    <Fade in={true}>
      <StyledContainer fixed>
        <StyledTitle>Configurações</StyledTitle>
        <Stack spacing={5} sx={{mb: 1}} alignItems="center">
          <StyledField>
            <StyledLabel>Volume da música</StyledLabel>
            <SliderWrapper>
              <VolumeDown color="primary" fontSize="large"/>
              <Controller
                name="volumeMusic"
                control={control}
                render={({field}) => (
                  <Slider {...field} sx={{flex: "1"}} aria-label="Volume"/>
                )}
              />
              <VolumeUp color="primary" fontSize="large"/>
            </SliderWrapper>
          </StyledField>
          <StyledField>
            <StyledLabel>Volume dos efeitos</StyledLabel>
            <SliderWrapper>
              <VolumeDown color="primary" fontSize="large"/>
              <Controller
                name="volumeEffects"
                control={control}
                render={({field}) => (
                  <Slider {...field} sx={{flex: "1"}} aria-label="Volume"/>
                )}
              />
              <VolumeUp color="primary" fontSize="large"/>
            </SliderWrapper>
          </StyledField>
        </Stack>

        <StyledButtonsContainer>

          <StyledButton variant="outlined" onClick={navigateBack}>
            <ArrowBack fontSize={"large"}/>
            Voltar
          </StyledButton>
          <StyledButton variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
            <SaveOutlined fontSize={"large"}/>
            Salvar
          </StyledButton>
        </StyledButtonsContainer>
      </StyledContainer>
    </Fade>
  );
};

export {Configuration};
