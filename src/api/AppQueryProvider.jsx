import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api/queryClient";

export const AppQueryProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default AppQueryProvider;
