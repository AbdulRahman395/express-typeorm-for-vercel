export const message = {
    // 200 Success
    fetchSuccess: 'Data fetched successfully.',
    requestSuccess: 'Request processed successfully.',
    loginSuccess: 'Login successful.',
    logoutSuccess: 'Logged out successfully.',
    passwordResetSuccess: 'Password reset successfully.',
    passwordChangeSuccess: 'Password changed successfully.',
    emailSent: 'Email sent successfully.',
    dataSaveSuccess: 'Data saved successfully.',
    dataUpdateSuccess: 'Data updated successfully.',
    accountCreated: 'Account created successfully.',
    accountUpdated: 'Account updated successfully.',
    accountReactivated: 'Account reactivated successfully.',
    deleteSuccess: 'Deleted successfully.',
    operationSuccess: 'Operation completed successfully.',
    unDeletedSuccess: 'Un-deleted successfully.',
    verificationSuccess: 'Verified successfully.',
    otpSent: 'OTP sent successfully.',
    recordUpdated: 'Record updated successfully.',
    recordNotSaved: 'Sharing history is currently paused. No record was created.',
    indexAvailable: 'Index is available.',

    // 201 Created
    createSuccess: 'Created successfully.',

    // 204 No Content
    noContent: 'No content to display.',

    // 400 Bad Request
    invalidRequest: 'Invalid request.',
    insufficientBalance: 'Insufficient balance.',
    validationError: 'Validation failed. Please check your input fields.',
    missingRequiredFields: 'Please enter all required fields.',
    invalidCredentials: 'Invalid credentials provided.',
    incorrectPassword: 'Incorrect password.',
    invalidOrExpiredOTP: 'Invalid or expired OTP.',
    noFileProvided: 'No file provided.',
    noImageUploaded: 'No image uploaded.',
    invalidDateFormat: 'Invalid date format for availableFrom.',
    invalidDeviceToken: 'Invalid device token.',
    invalidNotificationId: 'Invalid notification ID.',
    phoneRequired: 'Phone number is required.',
    phoneOrEmailRequired: 'Provide either phone or email.',
    otpRequired: 'OTP is required for verification.',
    newPasswordMustDiffer: 'New password must be different from old password.',
    googleIdTokenRequired: 'Google ID token is required.',
    emailNotPresentInGoogleToken: 'Email not present in Google token.',
    emailNotVerifiedByGoogle: 'Email not verified by Google.',
    preferenceNotEnabled: 'This history is hidden based on your preferences.',
    categoryLinkedWithEntities: "Category linked to other entities and can't be deleted.",
    parentNotFound: 'Parent category not found or is deleted.',
    headingNotFound: 'Heading not found or is deleted.',
    vendorAlreadyVerified: 'Your account is already verified.',
    vendorVerificationAlreadyExists: 'You have already applied for vendor verification.',
    rejectionReasonRequired: 'Rejection reason is required when status is rejected.',
    invalidStatus: 'Invalid status. Must be either "approved" or "rejected".',
    alreadyReported: 'You have already reported this product.',
    productNotFound: 'Product not found.',
    alreadyFeatured: 'Product is already featured.',

    // 401 Unauthorized
    unauthorizedAccess: 'Unauthorized access.',
    invalidOldPassword: 'Old password is not correct.',
    tokenMissing: 'No token provided.',
    invalidToken: 'Invalid token.',
    tokenExpired: 'Session expired. Please log in again.',
    userNotFound: 'User not found.',
    unverified: 'User is not verified.',
    verifyFirst: 'You are not verified. Please verify first.',
    accountBlocked: 'Your account is blocked.',

    // 403 Forbidden
    forbidden: 'Forbidden: You do not have permission to perform this action.',

    // 404 Not Found
    notFound: 'Details not found.',

    // 409 Conflict
    alreadyExists: 'Already exists.',
    emailExists: 'Email already exists.',
    indexExists: 'Index already exists.',

    // 500 Internal Server Error
    internalServerError: 'Internal server error. Please try again later.',
    unexpectedError: 'Something went wrong: server error.',
    emailSendError: 'Error sending email.',
    smsSendError: 'Error sending SMS.',
    operationFailed: 'Operation failed. Please try again later.',
};

export const statusCode = {
    success: 200,
    created: 201,
    accepted: 202,
    noContent: 204,
    badRequest: 400,
    unauthorized: 401,
    paymentRequired: 402,
    forbidden: 403,
    notFound: 404,
    conflict: 409,
    twoFactorRequired: 428, // Precondition Required - Used for 2FA verification
    internalServerError: 500,
};