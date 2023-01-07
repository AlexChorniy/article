import { Data } from '../models/data';

const Articles = ({ data }: { data: Data[] }): JSX.Element => {
  return (
    <>
      {data.map(({ title }, index) => (
        <div key={index}>{title}</div>
      ))}
    </>
  );
};

export default Articles;
