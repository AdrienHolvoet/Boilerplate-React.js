import styled from "styled-components";

const H1 = (props) => {
  return (
    <Wrapper className={props.className}>
      <LineBlock />
      <TitleH1> {props.children}</TitleH1>
    </Wrapper>
  );
};

const LineBlock = styled.span`
  display: inline-flex;
  width: 40px;
  height: 5px;
  background-color: transparent;
  border-bottom: 1px solid grey;
  margin-right: 20px;
  padding-bottom: 10px;
`;

const TitleH1 = styled.h1`
  font-size: 17px;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin: 0;
  padding: 0;
  color: grey;
  font-family: "Boston";
`;

const Wrapper = styled.div`
  display: flex;
  margin: 15px;
`;

export default H1;
