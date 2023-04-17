import type { Sequelize } from "sequelize";
import { subscribers as _subscribers } from "./subscribers";
import type { subscribersAttributes, subscribersCreationAttributes } from "./subscribers";

export {
  _subscribers as subscribers,
};

export type {
  subscribersAttributes,
  subscribersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const subscribers = _subscribers.initModel(sequelize);


  return {
    subscribers: subscribers,
  };
}
