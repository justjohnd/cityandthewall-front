import Router from 'next/router';

type Props = {
  text: string;
  url: string;
}

const Button: React.FC<Props> = (props) => {
  return (
    <>
      <a href="#" onClick={() => Router.push(`/${props.url}`)}>
        {props.text}
      </a>
      <style jsx>{`
        a {
          background: #ececec;
          border: 1px solid;
          padding: 1rem 2rem;
        }
      `}</style>
    </>
  );
}

export default Button