import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, View } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import Poster from "./Poster";

const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 60%;
  margin-left: 15px;
`;

const Overview = styled.Text`
  margin-top: 10px;
  color: ${(props) => (props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0,0,0,0.8)")};
`;

const Votes = styled(Overview)`
  font-size: 12px;
`;

const Slide = ({ backdrop_path, poster_path, original_title, vote_average, overview, fullData }) => {
  const isDark = useColorScheme() === "dark";
  const nagivation = useNavigation();
  const goToDetail = () => {
    nagivation.navigate("Stack", {
      screen: "Detail",
      params: {
        ...fullData,
      },
    });
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View style={{ flex: 1 }}>
        <BgImg style={StyleSheet.absoluteFill} source={{ uri: makeImgPath(backdrop_path) }} />
        <BlurView tint={isDark ? "dark" : "light"} intensity={95} style={StyleSheet.absoluteFill}>
          <Wrapper>
            <Poster path={poster_path} />
            <Column>
              <Title isDark={isDark}> {original_title}</Title>
              {vote_average > 0 ? <Votes isDark={isDark}>🌟{vote_average}/10</Votes> : null}
              <Overview isDark={isDark}>{overview.slice(0, 120)}...</Overview>
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Slide;
