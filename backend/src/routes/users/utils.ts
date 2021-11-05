import fetch from "cross-fetch";

import { API_EXTERNAL_USERS_URL } from "../../tools/environment";
import { User, UserResponse } from "./types";

export const DEFAULT_PAGINATION_INDEX = 1;
export const DEFAULT_PAGINATION_STEP = 1;

export const isPagesOverflow = (
  currentPage: number,
  totalPages: number
): boolean => {
  if (totalPages === 0) {
    return true;
  }

  if (currentPage <= totalPages) {
    return false;
  }

  return true;
};

export const buildPagination = (url: string, page: string | number): string => {
  if (!page || page === DEFAULT_PAGINATION_INDEX) {
    return url;
  }

  return url + `?page=${page}`;
};

export const parseUsersWithPagination = async (
  currentPage?: number
): Promise<User[]> => {
  const url = buildPagination(API_EXTERNAL_USERS_URL, currentPage);
  const apiResponse = await fetch(url);

  const { total_pages, data, page }: UserResponse = await apiResponse.json();

  if (isPagesOverflow(page, total_pages)) {
    return data;
  }

  const users = await parseUsersWithPagination(page + DEFAULT_PAGINATION_STEP);

  return [...data, ...users];
};
