import { useQueries } from "@tanstack/react-query";

import { ChartLine, ChartPie, Chart } from "../../../components";
import { getData } from "@/api";
import { UserProps, PostProps } from "@/types";

const urls = ["http://localhost:3001/posts", "http://localhost:3000/users"];

export const Dashboard: React.FC = () => {
  const queries = useQueries({
    queries: urls.map((item, i) => {
      return {
        queryKey: ["data", i],
        queryFn: () => getData(item),
      };
    }),
  });

  const posts = queries[0].data as PostProps[];
  const users = queries[1].data as UserProps[];

  return (
    <div className="dashboard">
      <Chart dataLength={users?.length} title="Numarul de utilizator">
        <ChartPie data={users} />
      </Chart>

      <Chart dataLength={posts?.length} title="Numarul de postari">
        <ChartLine data={posts} />
      </Chart>
    </div>
  );
};
