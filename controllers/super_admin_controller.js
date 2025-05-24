/**
 * Super Admin Controller
 * Handles super admin operations, specifically the approval of admin API keys
 */
const ApiKeyModel = require('../models/apikey_model');

/**
 * Approves an admin API key by a super admin
 * @param {Object} req - Express request object containing superAdminKey and adminKey in query
 * @param {Object} res - Express response object
 * @returns {Object} JSON response indicating approval status
 */
async function superAdminApprovesAdmin(req, res) {
  // Extract API keys from query parameters
  const superAdminKey = req.query.superAdminKey;
  const adminKey = req.query.adminKey;

  // Validate if both API keys are provided
  if (!superAdminKey || !adminKey) {
    return res.status(400).json({ 
      status: false, 
      message: "Missing API key(s)" 
    });
  }

  // Verify super admin key and permissions
  const superAdminKeyDoc = await ApiKeyModel.findOne({ key: superAdminKey });

  if (!superAdminKeyDoc || !superAdminKeyDoc.key || superAdminKeyDoc.is_super_admin !== true) {
    return res.status(401).json({ 
      status: false, 
      message: "Invalid or missing super admin API key" 
    });
  }

  try {
    // Update admin key approval status
    const updatedAdmin = await ApiKeyModel.findOneAndUpdate(
      { key: adminKey, role: 'admin' },
      { $set: { is_admin_approved: true } },
      { new: true }
    );

    // Check if admin key exists
    if (!updatedAdmin) {
      return res.status(404).json({ 
        status: false, 
        message: "Admin key not found. Please register for an admin key" 
      });
    }

    // Return success response
    return res.status(200).json({ 
      status: true, 
      message: "Admin approved successfully",
      data: {
        adminKey: updatedAdmin.key,
        isApproved: updatedAdmin.is_admin_approved
      }
    });
  } catch (err) {
    // Handle any unexpected errors
    return res.status(500).json({ 
      status: false, 
      message: "Failed to approve admin",
      error: err.message 
    });
  }
}

module.exports = superAdminApprovesAdmin;