import type { Sequelize } from "sequelize";
import { one_time_password as _one_time_password } from "./one_time_password";
import type { one_time_passwordAttributes, one_time_passwordCreationAttributes } from "./one_time_password";
import { upload_file as _upload_file } from "./upload_file";
import type { upload_fileAttributes, upload_fileCreationAttributes } from "./upload_file";
import { url_short as _url_short } from "./url_short";
import type { url_shortAttributes, url_shortCreationAttributes } from "./url_short";
import { user as _user } from "./user";
import type { userAttributes, userCreationAttributes } from "./user";
import { user_session as _user_session } from "./user_session";
import type { user_sessionAttributes, user_sessionCreationAttributes } from "./user_session";

export {
  _one_time_password as one_time_password,
  _upload_file as upload_file,
  _url_short as url_short,
  _user as user,
  _user_session as user_session,
};

export type {
  one_time_passwordAttributes,
  one_time_passwordCreationAttributes,
  upload_fileAttributes,
  upload_fileCreationAttributes,
  url_shortAttributes,
  url_shortCreationAttributes,
  userAttributes,
  userCreationAttributes,
  user_sessionAttributes,
  user_sessionCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const one_time_password = _one_time_password.initModel(sequelize);
  const upload_file = _upload_file.initModel(sequelize);
  const url_short = _url_short.initModel(sequelize);
  const user = _user.initModel(sequelize);
  const user_session = _user_session.initModel(sequelize);


  return {
    one_time_password: one_time_password,
    upload_file: upload_file,
    url_short: url_short,
    user: user,
    user_session: user_session,
  };
}
