import passport from "passport";

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, { session: false }, function (error, user, info) {
        if (error) return next(error);
        if (!user)
          return res.status(401).send({ error: `Error de credencial` });
        req.user = user;
        console.log('reqCall', req.user)
        next();
      }
    )(req, res, next);
  };
};

// ! Función para redireccionar si el usuario esta logueado.
export const passportCallRedirect = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(
      strategy,
      { session: false },
      function (error, user, info) {
        if (user) {
          req.user = user;
          return res.redirect("/products");
        }
        next();
      }
    )(req, res, next);
  };
};

export const authorizationRole = (roles) => {
  return async (req, res, next) => {
    const { user } = req.user;
    if (!user) return res.status(401).send({ error: `Unauthorizad` });
    if (!roles.includes(user.role))
      return res.status(403).send({ error: `No permissions` });
    next();
  };
};
