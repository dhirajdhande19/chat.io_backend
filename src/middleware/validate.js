import Joi from 'joi';

export const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false, // show all errors
      allowUnknown: false, // reject extra fields
      stripUnknown: true, // remove unwanted fields
    });

    if (error) {
      const errors = error.details.map((d) => d.message);

      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors,
      });
    }

    req[property] = value;
    next();
  };
};
