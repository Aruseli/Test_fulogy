import { useRouter } from "next/router";

const fakeRouter = {};

export function useQuery(name, defaultValue) {
  const router = useRouter();

  const { query, pathname, push } = router || fakeRouter;

  const result = [
    query && query[name] ? JSON.parse(String(query[name])) : defaultValue,
    value => {
      push({
        pathname,
        query: {
          ...query,
          [name]: JSON.stringify(value)
        }
      });
    }
  ];

  return result;
}

export default useQuery;
