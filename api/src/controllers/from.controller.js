import { Form } from "../models/form.model.js";
import { ResponseForm } from "../models/response.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Controller function to create a form
const createForm = asyncHandler(async (req, res) => {
  // Get form fields from the request body
  const { fields } = req.body;

  // Validate form fields
  if (!fields || fields.length === 0) {
    throw new ApiError(400, "Form fields are required");
  }

  // Create the form
  const ownerId = req.user._id;

  // Create the form
  const form = await Form.create({ owner: ownerId, fields });

  // Check if the form was created successfully
  if (!form) {
    throw new ApiError(500, "Failed to create form");
  }

  // Respond with success message and the created form
  return res
    .status(201)
    .json(new ApiResponse(200, form, "Form created successfully"));
});

const getUserForms = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Assuming user ID is available in the request object
  const forms = await Form.find({ owner: userId }).lean(); // Assuming 'Form' is the Mongoose model

  if (!forms) {
    throw new ApiError(404, "No forms found for the user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, forms, "Forms retrieved successfully"));
});

const getFormById = asyncHandler(async (req, res) => {
  const formId = req.params.formId; // Assuming the form ID is provided in the request params
  const form = await Form.findById({ _id: formId }); // Assuming 'Form' is the Mongoose model

  if (!form) {
    throw new ApiError(404, "Form not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, form, "Form retrieved successfully"));
});

const submitForm = asyncHandler(async (req, res) => {
  const { formId } = req.params;
  const { fields } = req.body;
  const userId = req.user._id;

  const existForm = await Form.findOne({ _id: formId });
  if (!existForm) {
    throw new ApiError(404, "Form not found");
  }

  const resform = await ResponseForm.create({
    owner: existForm.owner,
    user: userId,
    formId,
    fields,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, resform, "Form submitted successfully"));
});


const getAllResponses = asyncHandler(async (req, res) => {
    const ownerId = req.user._id; // Assuming owner ID is available in the request object
    const responses = await ResponseForm.find({ owner: ownerId }).lean(); // Assuming 'ResponseForm' is the Mongoose model
  
    if (!responses) {
      throw new ApiError(404, "No responses found for the user");
    }
  
    return res
      .status(200)
      .json(new ApiResponse(200, responses, "Responses retrieved successfully"));
});
  

export { createForm, getUserForms, getFormById, submitForm, getAllResponses };
