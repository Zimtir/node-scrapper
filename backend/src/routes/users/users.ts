import type { Request, Response } from "express";
import { Requests, Responses, Route, Routes } from "../../types";
import { parseUsersWithPagination } from "./utils";

export const parseUsers = (): Route<unknown> => ({
  enabled: true,
  path: Routes.parseUsers,
  callback: async (_request: Request, response: Response): Promise<void> => {
    const users = await parseUsersWithPagination();

    response.send({
      ...Responses.OK,
      data: users,
    });
  },
  type: Requests.get,
});
