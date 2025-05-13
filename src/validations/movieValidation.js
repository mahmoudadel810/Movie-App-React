import Joi from "joi";

//3shan ahndl el array
const arrayString = Joi.extend((joi) => {
  return {
    type: "arrayString",
    base: joi.array(),
    messages: {
      "arrayString.item": "{{#label}} must have at least one item with content",
    },
    validate(value, helpers) {
      // Check if at least one array item is not empty
      if (!value.some((item) => item && item.trim() !== "")) {
        return { value, errors: helpers.error("arrayString.item") };
      }
    },
  };
});

// Define Joi schema for movie data
export const movieSchema = Joi.object({
  Title: Joi.string().min(1).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 1 character",
    "any.required": "Title is required",
  }),

  Year: Joi.string()
    .pattern(/^\d{4}$/)
    .required()
    .messages({
      "string.empty": "Year is required",
      "string.pattern.base": "Year must be a 4-digit number",
      "any.required": "Year is required",
    }),

  Rated: Joi.string().allow("").optional(),

  Released: Joi.string().allow("").optional(),

  Runtime: Joi.string().allow("").optional(),

  Genre: arrayString.arrayString().items(Joi.string()).min(1).messages({
    "array.min": "At least one genre must be provided",
    "arrayString.item": "At least one genre must have content",
  }),

  Director: arrayString.arrayString().items(Joi.string()).min(1).messages({
    "array.min": "At least one director must be provided",
    "arrayString.item": "At least one director must have content",
  }),

  Writer: arrayString.arrayString().items(Joi.string()).min(1).messages({
    "array.min": "At least one writer must be provided",
    "arrayString.item": "At least one writer must have content",
  }),

  Actors: arrayString.arrayString().items(Joi.string()).min(1).messages({
    "array.min": "At least one actor must be provided",
    "arrayString.item": "At least one actor must have content",
  }),

  Plot: Joi.string().min(10).required().messages({
    "string.empty": "Plot is required",
    "string.min": "Plot must be at least 10 characters",
    "any.required": "Plot is required",
  }),

  Language: arrayString.arrayString().items(Joi.string()).min(1).messages({
    "array.min": "At least one language must be provided",
    "arrayString.item": "At least one language must have content",
  }),

  Country: arrayString.arrayString().items(Joi.string()).min(1).messages({
    "array.min": "At least one country must be provided",
    "arrayString.item": "At least one country must have content",
  }),

  Awards: Joi.string().allow("").optional(),

  Poster: Joi.string().uri().required().messages({
    "string.empty": "Poster URL is required",
    "string.uri": "Poster must be a valid URL",
    "any.required": "Poster URL is required",
  }),

  Ratings: Joi.array().items(
    Joi.object({
      Source: Joi.string().allow(""),
      Value: Joi.string().allow(""),
    })
  ),

  Metascore: Joi.string().allow("").optional(),

  imdbRating: Joi.string()
    .pattern(/^(\d+\.\d+|\d+|N\/A)$/)
    .allow("")
    .optional()
    .messages({
      "string.pattern.base": "IMDB Rating must be a number or N/A",
    }),

  imdbVotes: Joi.string().allow("").optional(),

  id: Joi.string().allow("").optional(),

  Type: Joi.string()
    .valid("movie", "series", "episode")
    .default("movie")
    .messages({
      "any.only": "Type must be movie, series, or episode",
    }),

  DVD: Joi.string().allow("").optional(),

  BoxOffice: Joi.string().allow("").optional(),

  Trailer: Joi.string().uri().required().messages({
    "string.empty": "Trailer URL is required",
    "string.uri": "Trailer must be a valid URL",
    "any.required": "Trailer URL is required",
  }),

  Production: Joi.string().allow("").optional(),

  Website: Joi.string().allow("").optional(),

  Response: Joi.string().valid("True", "False").default("True"),

  Popular: Joi.string().valid("true", "false").default("false"),
});

export const validateMovie = (movie) => {
  return movieSchema.validate(movie, { abortEarly: false });
};

export default validateMovie;
