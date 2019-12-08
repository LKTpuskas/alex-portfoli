import { css } from 'emotion';

export const modalWrapper = css`
  font-family: nivea;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const alignerImage = css`
  margin: 2px;
  padding: 10px;
  @media screen and (max-width: 400px) {
    min-width: 125px;
  }
  @media screen and (min-height: 1000px) {
    max-width: 500px;
  }
  @media screen and (max-height: 999px) {
    max-width: 400px;
  }
`;

const alignerItemTop = css`
  align-self: flex-start;
`;

const alignerItemBottom = css`
  align-self: flex-end;
`;

const heroImage = css`
  height: auto;
  width: 100%;
  box-shadow: 14px 17px 20px 0px #03030321;
`;

const headTitleRight = css``;

export default {
  modalWrapper,
  heroImage,
  headTitleRight,
  alignerImage,
  alignerItemTop,
  alignerItemBottom
};
