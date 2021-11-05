import { parseUsers } from "./users/users";
import { getStatus } from "./status";

export const routes = [getStatus(), parseUsers()];
