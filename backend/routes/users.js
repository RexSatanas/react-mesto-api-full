const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getAllUsers, getUser, getCurrentUser, updateUserInfo, updateAvatar,
} = require("../controllers/users");
/*
GET /users — возвращает всех пользователей
GET /users/:userId - возвращает пользователя по _id
POST /users — создаёт пользователя */

/*  PATCH /users/me — обновляет профиль
    PATCH /users/me/avatar — обновляет аватар
*/

router.get("/users", getAllUsers);
router.get("/users/me", getCurrentUser);

router.get("/users/:userId", celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUser);

router.patch("/users/me", celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);

router.patch("/users/me/avatar", celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(
      /^(https?:\/\/)?([a-zA-z0-9%$&=?/.-]+)\.([a-zA-z0-9%$&=?/.-]+)([a-zA-z0-9%$&=?/.-]+)?(#)?$/,
    ),
  }),
}), updateAvatar);

module.exports = router;
