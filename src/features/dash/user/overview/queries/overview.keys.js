export const userOverviewKeys = {
  all: ["dash", "user", "overview"],
  overview: () => [...userOverviewKeys.all, "summary"],
  myLine: () => [...userOverviewKeys.all, "my-line"],
  profile: () => [...userOverviewKeys.all, "profile"],
};
