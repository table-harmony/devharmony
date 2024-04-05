"use server";

import { models } from "../models";

export const getModelsAction = async () => {
  return Object.keys(models);
};
