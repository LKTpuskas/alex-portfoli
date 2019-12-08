import { css } from 'emotion';
import LinkButton from '../LinkButton';

const container = css`
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 1rem;
`

const grid = css`
  @media screen and (min-width: 600px) {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
  }
`

const cell = css`
  margin: 1rem;
  li img {
    display: block;
  }
  @media screen and (min-width: 600px) {
    width: calc(25% - 2rem);
  }

  @media screen and (min-width: 1000px) {
    width: calc(20% - 2rem);
  }

  @media screen and (min-width: 1300px) {
    width: calc(25% - 2rem);
  }
`

const responsiveImage = css`
  max-width: 100%;
`

const Prints = props => {
  return (
    <div className={container}>
      <LinkButton href={'/'} name={'Home'}/>
      <div className={grid} >
        {
          props.printsData.map((imgObject, index) => {
            return (
              <li className={cell} key={index} >
                <img className={responsiveImage} src={imgObject.image} alt="" />
                <p>{imgObject.info}</p>
              </li>
            )
          })
        }
      </div>
    </div>
  )
}

export default Prints;
